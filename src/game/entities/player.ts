import { SimObject, Rect, Engine, Color, Vector3, Vector2, Keys, approach, BoundingBox } from "scrapy-engine";
import { Direction } from "../utils/direction";
import { Character } from "./character";
import { Projectile } from "./projectile";
import { eventBus } from "@/utils/event-bus";

const SIZE = 32;
const CHECK_HITBOX_SIZE = 32;


export class Player extends Character{	
	public sprite:SimObject;
	public lookingDirection:Direction = Direction.RIGHT;
	public checkHitbox:BoundingBox;
	public attackInterval:number = 250;
	protected maxHealth = 5;

	public constructor(engine:Engine) {
		super(engine);
		this.sprite = new Rect(this.engine, SIZE, SIZE, Color.blue());
		this.sprite.transform.position.x = -SIZE / 2;
		this.sprite.transform.position.y = -SIZE / 2;
		this.addChild(this.sprite);
		
		this.hitbox.size = new Vector3(SIZE, SIZE, 10);
		this.hitbox.color = Color.red();
		
		this.checkHitbox = new BoundingBox(this.engine);
		this.checkHitbox.size=  new Vector3(CHECK_HITBOX_SIZE, CHECK_HITBOX_SIZE, 10);
		this.checkHitbox.color = Color.blue();
		this.addChild(this.checkHitbox);
		
		this.health = this.maxHealth;
		eventBus.emit("health", this.health);
		eventBus.emit("max-health", this.maxHealth);
	}

	public update(dt:number):void {
		let dtMilis = dt/1000.0;
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
		let projectile = new Projectile(this.engine, this);
		projectile.direction = this.lookingDirection;
		this.getRoom().addProjectile(projectile);
		super.attack();
	}

	public doDamage(damage:number):void {
		super.doDamage(damage);
		eventBus.emit("health", this.health);
	}

	public kill():void {
		console.log("GAME OVER");
	}
}