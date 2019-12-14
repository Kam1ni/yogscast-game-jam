import { SimObject, Engine, Color, Rect, Keys, BoundingBox } from "scrapy-engine";
import { Player } from "./player";
import { Begar } from "./begar";
import { Wall } from "./wall";
import { Character } from "./character";
import { Enemy } from "./enemy";
import { Projectile } from "./projectile";

export abstract class Room extends SimObject {
	public background:SimObject;
	public player:Player;
	public begars:Begar[] = [];
	public walls:Wall[] = [];
	public enemies:Enemy[] = [];
	public projectiles:Projectile[] = [];

	public constructor(engine:Engine, player:Player) {
		super(engine);
		
		this.background = new Rect(engine, 512, 256, Color.white());
		this.background.transform.position.z = -5;
		this.addChild(this.background);

		this.player = player;
		this.addChild(player);
	}

	public update(dt:number):void {
		if (this.engine.input.isKeyPressed(Keys.Space)) {
			let touchingBegar = this.checkForTouchingBegar();
			if (touchingBegar) {
				touchingBegar.giveHealth(this.player);
			}
		}
		
		super.update(dt);
		this.correctEnemiesCollisions();
		for (let enemy of this.enemies) {
			this.correctForCollision(this.player, enemy.hitbox);
		}
		this.correctForBegarCollision(this.player);
		this.correctForWallCollision(this.player);
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


	public addBegar(begar:Begar):void {
		this.begars.push(begar);
		this.addChild(begar);
	}

	public addEnemey(enemy:Enemy):void {
		this.enemies.push(enemy);
		this.addChild(enemy);
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
		this.removeChild(projectile);
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

		let xPoint = 0;
		let yPoint = 0;
		let staticXPoint = 0;
		let staticYPoint = 0;

		let minPont = char.hitbox.getMinPoint();
		let maxPoint = char.hitbox.getMaxPoint();
		let staticMinPoint = staticBox.getMinPoint();
		let staticMaxPoint = staticBox.getMaxPoint();
		let xDiff = 0;
		let yDiff = 0;

		if (collision.x > 0) {
			xPoint = maxPoint.x;
			staticXPoint = staticMinPoint.x;
			xDiff = staticXPoint - xPoint;
		}else {
			xPoint = minPont.x;
			staticXPoint = staticMaxPoint.x;
			xDiff = xPoint - staticXPoint;
		}

		if (collision.y > 0) {
			yPoint = maxPoint.y;
			staticYPoint = staticMinPoint.y;
			yDiff = staticYPoint - yPoint;
		}else {
			yPoint = minPont.y;
			staticYPoint = staticMaxPoint.y;
			yDiff = yPoint - staticYPoint;
		}

		if (Math.abs(yDiff) < Math.abs(xDiff)) {
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

	public correctForBegarCollision(char:Character):void {
		for (let begar of this.begars) {
			this.correctForCollision(char, begar.hitbox);
		}
	}

	public correctEnemiesCollisions():void {
		for (let enemy of this.enemies) {
			this.correctForBegarCollision(enemy);
			this.correctForWallCollision(enemy);
		}
	}

	public checkForProjectileCollisions():void {
		for (let projectile of this.projectiles) {
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
}