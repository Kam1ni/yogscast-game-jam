import { SimObject, Engine, Color, Rect, Keys, BoundingBox, Sprite, AnimatedSprite, approach, Vector3 } from "scrapy-engine";
import { Player } from "./player";
import { Begar } from "./begar";
import { Wall } from "./wall";
import { Character } from "./character";
import { Enemy } from "./enemy";
import { Projectile } from "./projectile";
import { Floor } from "../graphics/floor";
import { Door } from "./door";
import { Heart } from "./heart";
import { Direction } from "../utils/direction";
import { WallCorner } from "./wall-corner";

export abstract class Room extends SimObject {
	public background:Floor;
	public player:Player;
	public begars:Begar[] = [];
	public walls:Wall[] = [];
	public enemies:Enemy[] = [];
	public projectiles:Projectile[] = [];
	public doors:Door[] = [];
	public hearts:Heart[] = [];
	public cleared:boolean = false;
	protected isStarted:boolean = false;
	protected isStarting:boolean = false;
	protected isEnding:boolean = false;
	protected entrance:Door;
	protected exit:Door;
	public preventFire:boolean = false;

	public constructor(engine:Engine, player:Player) {
		super(engine);
		
		this.background = new Floor(engine, 18, 10);
		this.background.transform.position.x -= 16;
		this.background.transform.position.y -= 16;
		this.transform.position.z = -100000;
		this.addChild(this.background);

		this.buildLevel();

		this.player = player;
	}

	public buildDefaultWall():void {
		// The transformations of the hitbox is to prevent players with sub optimal performance from glitching out of the room
		let wall = new Wall(this.engine, 0, 128, 16, 1, Direction.DOWN);
		wall.hitbox.size.x = 512;
		wall.hitbox.size.y = 512;
		wall.hitbox.transform.position.y = 256;
		this.addWall(wall);

		wall = new Wall(this.engine, 0, -16, 16, 1,  Direction.UP);
		this.addWall(wall);
		wall.hitbox.size.x = 512;
		wall.hitbox.size.y = 512;
		wall.hitbox.transform.position.y = -240;

		wall = new Wall(this.engine, -16, 0, 1, 8, Direction.LEFT);
		wall.hitbox.size.x = 512;
		wall.hitbox.size.y = 512;
		wall.hitbox.transform.position.x = -240;
		this.addWall(wall);

		wall = new Wall(this.engine, 256, 0, 1, 8, Direction.RIGHT);
		wall.hitbox.size.x = 512;
		wall.hitbox.size.y = 512;
		wall.hitbox.transform.position.x = 256;
		this.addWall(wall);

		let corner = new WallCorner(this.engine, -16, -16, Direction.UP);
		this.addWall(corner);

		corner = new WallCorner(this.engine, 256, 128, Direction.DOWN);
		this.addWall(corner);

		corner = new WallCorner(this.engine, 256, -16, Direction.RIGHT);
		this.addWall(corner);

		corner = new WallCorner(this.engine, -16, 128, Direction.LEFT);
		this.addWall(corner);

	}

	public abstract buildLevel():void;
	public abstract addEnemies():void;
	public abstract exited(door:Door):void;

	public enterRoom(entrance:Door):void {
		if (this.isStarted) {
			return;
		}
		this.transform.position.z = 0;
		this.entrance = entrance;
		this.addChild(this.player);
		entrance.open();
		this.isStarting = true;
		let player = entrance.enterSound.play();
		player.volume = 0.3;
		let doorPos = entrance.transform.position;
		let offset = entrance.getSpawnPointBeginOffset();
		this.player.transform.position = doorPos.add(offset);
		this.player.lookingDirection = entrance.direction;
		this.player.sprite.playWalkAnimation(this.player.lookingDirection);
		this.player.velocity = new Vector3();
	}

	private doStartSequence(dt:number):void {
		let doorPos = this.entrance.transform.position;
		let offset = this.entrance.getSpawnPointOffset();
		let target = doorPos.add(offset);
		this.player.transform.position.x = approach(this.player.transform.position.x, target.x, dt / 50);
		this.player.transform.position.y = approach(this.player.transform.position.y, target.y, dt / 50);
		this.player.sprite.playWalkAnimation(this.player.lookingDirection);

		if (this.player.transform.position.x == target.x && this.player.transform.position.y == target.y) {
			this.isStarted = true;
			this.isStarting = false;
			if (!this.cleared) {
				this.addEnemies();
			}
			this.player.sprite.idle();
			this.entrance.close();
		}
	}

	private doEndSequence(dt:number):void {
		let doorPos = this.exit.transform.position;
		let offset = this.exit.getSpawnPointBeginOffset();
		let target = doorPos.add(offset);
		this.player.transform.position.x = approach(this.player.transform.position.x, target.x, dt / 50);
		this.player.transform.position.y = approach(this.player.transform.position.y, target.y, dt / 50);
		this.player.sprite.playWalkAnimation(this.player.lookingDirection);

		if (this.player.transform.position.x == target.x && this.player.transform.position.y == target.y) {
			this.isStarted = false;
			this.isStarting = false;
			this.isEnding = false;
			this.player.remove();
			this.exit.close();
			this.transform.position.z = -1000000;
			this.exited(this.exit);
		}
	}

	public exitRoom(exit:Door):void {
		let player = exit.exitSound.play();
		player.volume = 0.3;
		this.exit = exit;
		this.isEnding = true;
		this.isStarted = false;
		this.player.velocity = new Vector3();
	}


	public update(dt:number):void {
		this.preventFire = false;
		if (this.isStarting) {
			this.doStartSequence(dt);
			this.preventFire = true;
		}
		if (this.isEnding) {
			this.doEndSequence(dt);
			this.preventFire = true;
		}
		if (this.player.health == 0) {
			return;
		}
		
		if (this.engine.input.isKeyPressed(Keys.Space) && !this.preventFire) {
			let touchingDoor = this.checkForTouchingOpenDoor();
			if (touchingDoor) {
				this.exitRoom(touchingDoor);
				this.preventFire = true;
				return;
			}
			
			let touchingBegar = this.checkForTouchingBegar();
			if (touchingBegar) {
				if (touchingBegar.giveHealth(this.player)) {
					this.begars.splice(this.begars.indexOf(touchingBegar), 1);
					this.preventFire = true;
				}
			}
		}
		super.update(dt);
		if (!this.isStarted) return;
		
		if (this.enemies.length == 0) {
			for (let door of this.doors) {
				door.open();
				this.cleared = true;
			}
		}

		this.checkForHeartCollisions();
		this.correctEnemiesCollisions();
		for (let enemy of this.enemies) {
			this.correctForCollision(this.player, enemy.hitbox);
		}
		this.correctForBegarCollision(this.player);
		this.correctForWallCollision(this.player);
		this.correctForDoorCollision(this.player);
		this.checkForProjectileCollisions();
	}

	private checkForTouchingBegar():Begar {
		for (let begar of this.begars) {
			let point = this.player.checkHitbox.isTouching(begar.hitbox);
			if (point) {
				return begar;
			}
		}
		return null;
	}

	private checkForTouchingOpenDoor():Door {
		for (let door of this.doors.filter(d=>d.getIsOpen())) {
			let point = this.player.checkHitbox.isTouching(door.entranceHitbox);
			if (point) {
				return door;
			}
		}
		return null;
	}


	public addBegar(begar:Begar):void {
		this.begars.push(begar);
		this.addChild(begar);
	}

	public addEnemy(enemy:Enemy):void {
		this.enemies.push(enemy);
		this.addChild(enemy);
	}

	public addDoor(door:Door):void {
		this.doors.push(door);
		this.addChild(door);
	}

	public addHeart(heart:Heart):void {
		this.hearts.push(heart);
		this.addChild(heart);
	}

	public addProjectile(projectile:Projectile):void {
		projectile.transform.position.x = projectile.sender.transform.position.x;
		projectile.transform.position.y = projectile.sender.transform.position.y;
		this.projectiles.push(projectile);
		this.addChild(projectile);
	}

	public removeProjectile(projectile:Projectile):void {
		let i = this.projectiles.indexOf(projectile);
		if (i != -1) {
			this.projectiles.splice(i, 1);
		}
		projectile.destroy();
	}

	public removeEnemy(enemy:Enemy):void {
		let i = this.enemies.indexOf(enemy);
		if (i != -1) {
			this.enemies.splice(i, 1);
		}
		this.removeChild(enemy);
	}

	public addWall(wall:Wall):void {
		this.walls.push(wall);
		this.addChild(wall);
	}

	public correctForCollision(char:Character, staticBox:BoundingBox):void {
		let collision = char.hitbox.isTouching(staticBox);
		if (!collision) return;

		if (Math.abs(collision.y) < Math.abs(collision.x)) {
			char.transform.position.y -= collision.y;
			if (collision.y > 0 && char.velocity.y > 0) {
				char.velocity.y = 0;
			}else if (collision.y < 0 && char.velocity.y < 0) {
				char.velocity.y = 0;
			}
		}else {
			char.transform.position.x -= collision.x;
			if (collision.x > 0 && char.velocity.x > 0) {
				char.velocity.x = 0;
			}else if (collision.x < 0 && char.velocity.x < 0) {
				char.velocity.x = 0;
			}
		}
		char.updateMatrices();
	}

	public correctForWallCollision(char:Character):void {
		for (let wall of this.walls) {
			this.correctForCollision(char, wall.hitbox);
		}
	}

	public correctForDoorCollision(char:Character):void {
		for (let door of this.doors) {
			this.correctForCollision(char, door.hitbox);
		}
	}

	public correctForBegarCollision(char:Character):void {
		for (let begar of this.begars) {
			this.correctForCollision(char, begar.hitbox);
		}
	}

	public correctEnemiesCollisions():void {
		for (let i = 0; i < this.enemies.length; i++) {
			let enemy = this.enemies[i];
			if (i+1 < this.enemies.length) {
				for (let c = i+1; c < this.enemies.length; c++) {
					this.correctForCollision(enemy, this.enemies[c].hitbox);
				}
			}
			this.correctForBegarCollision(enemy);
			this.correctForWallCollision(enemy);
			this.correctForDoorCollision(enemy);
		}
	}

	public checkForProjectileCollisions():void {
		for (let i = this.projectiles.length-1; i >= 0; i--) {
			let projectile = this.projectiles[i];
			if (this.player != projectile.sender) {
				let collision = projectile.hitbox.isTouching(this.player.hitbox);
				if (collision) {
					this.player.doDamage(projectile.damage);
					this.removeProjectile(projectile);
					continue;
				}
			}

			for (let enemy of this.enemies) {
				if (enemy != projectile.sender) {
					let collision = projectile.hitbox.isTouching(enemy.hitbox);
					if (collision) {
						enemy.doDamage(projectile.damage);
						this.removeProjectile(projectile);
						continue;
					}
				}
			}

			for (let wall of this.walls) {
				let collision = projectile.hitbox.isTouching(wall.hitbox);
				if (collision) {
					this.removeProjectile(projectile);
					continue;
				}
			}
		}
	}

	public checkForHeartCollisions():void {
		for (let i = this.hearts.length - 1; i >= 0; i--) {
			let heart = this.hearts[i];
			if (this.player.hitbox.isTouching(heart.hitbox)) {
				this.player.heal(1);
				this.hearts.splice(i, 1);
				heart.soundEfect.play();
				heart.destroy();
			}
		}
	}

	public getIsStarted():boolean {
		return this.isStarted;
	}
}