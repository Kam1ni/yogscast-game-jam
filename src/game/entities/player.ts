import { SimObject, Rect, Engine, Color, Vector3, Vector2, Keys, approach, BoundingBox, Audio } from "scrapy-engine";
import { Direction } from "../utils/direction";
import { Character } from "./character";
import { Projectile } from "./projectile";
import { eventBus } from "@/utils/event-bus";
import { PlayerSprite } from "../graphics/player-sprite";

const SIZE = 16;
const CHECK_HITBOX_SIZE = 16;


export class Player extends Character{	
	public sprite:PlayerSprite;
	public lookingDirection:Direction = Direction.RIGHT;
	public checkHitbox:BoundingBox;
	public attackInterval:number = 250;
	protected maxHealth = 5;

	public fireballSound:Audio;

	public constructor(engine:Engine) {
		super(engine);
		this.sprite = new PlayerSprite(this.engine);
		this.sprite.transform.position.x = -SIZE / 2;
		this.sprite.transform.position.y = -SIZE / 2;
		this.addChild(this.sprite);
		
		this.hitbox.size = new Vector3(SIZE, SIZE, 10);
		this.hitbox.color = Color.red();
		
		this.checkHitbox = new BoundingBox(this.engine);
		this.checkHitbox.size=  new Vector3(CHECK_HITBOX_SIZE, CHECK_HITBOX_SIZE, 10);
		this.checkHitbox.color = Color.blue();
		this.addChild(this.checkHitbox);
		
		this.fireballSound = this.engine.assetLoaders.audioLoader.getAsset("fireball.wav");

		this.health = this.maxHealth;
		eventBus.emit("health", this.health);
		eventBus.emit("max-health", this.maxHealth);
	}

	public update(dt:number):void {
		if (!this.getRoom().getIsStarted()) {
			return super.update(dt);
		}
		let targetX = 0;
		let targetY = 0;

		if (this.engine.input.isKeyDown(Keys.W)) {
			targetY = this.maxSpeed;
			this.lookingDirection = Direction.UP;
		}else if (this.engine.input.isKeyDown(Keys.S)) {
			targetY = -this.maxSpeed;
			this.lookingDirection = Direction.DOWN;
		}else {
			targetY = 0;
		}

		if (this.engine.input.isKeyDown(Keys.D)) {
			targetX = this.maxSpeed;
			this.lookingDirection = Direction.RIGHT;
		}else if (this.engine.input.isKeyDown(Keys.A)) {
			targetX = -this.maxSpeed;
			this.lookingDirection = Direction.LEFT;
		}else {
			targetX = 0;
		}

		if (targetX != 0 || targetY != 0) {
			this.sprite.playWalkAnimation(this.lookingDirection);
		}else {
			this.sprite.idle();
		}

		if (this.engine.input.isKeyPressed(Keys.Space)) {
			if (this.canAttack()) {
				this.attack();
			}
		}


		this.velocity.x = approach(this.velocity.x, targetX, dt * this.acceleration);
		this.velocity.y = approach(this.velocity.y, targetY, dt * this.acceleration);

		this.updateHitboxPosition();

		super.update(dt);
	}

	private updateHitboxPosition():void {
		this.checkHitbox.transform.position.x = 0;
		this.checkHitbox.transform.position.y = 0;

		if (this.lookingDirection == Direction.UP) {
			this.checkHitbox.transform.position.y = SIZE / 2;
		} else if (this.lookingDirection == Direction.DOWN) {
			this.checkHitbox.transform.position.y = -SIZE / 2;
		} else if (this.lookingDirection == Direction.RIGHT) {
			this.checkHitbox.transform.position.x = SIZE / 2;
		} else {
			this.checkHitbox.transform.position.x = -SIZE / 2;
		}
	}

	public attack():void {
		let projectile = new Projectile(this.engine, this, this.lookingDirection);
		this.getRoom().addProjectile(projectile);
		let player = this.fireballSound.play();
		player.volume = 0.5;
		super.attack();
	}

	public doDamage(damage:number):void {
		super.doDamage(damage);
		eventBus.emit("health", this.health);
	}

	public heal(ammount:number):void {
		console.log("HEALING");
		this.health += ammount;
		if (this.health > this.maxHealth) {
			console.log("SETTING MAX HEALTH");
			this.health = this.maxHealth;
		}
		eventBus.emit("health", this.health);
	}

	public kill():void {
		console.log("GAME OVER");
	}
}