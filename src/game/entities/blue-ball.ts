import { Enemy } from "./enemy";
import { approach, Engine, Vector3 } from "scrapy-engine";
import { BlueBallSprite } from "../graphics/blue-ball-sprite";
import { Direction } from "../utils/direction";
import { DeathAnimation } from "./death-animation";

const SIZE = 16;

export class BlueBall extends Enemy {
	public sprite:BlueBallSprite;
	public direction:Direction = Direction.LEFT;
	public spawned:boolean = false;
	public spawnAnimation:DeathAnimation;

	public constructor(engine:Engine, position:Vector3) {
		super(engine);
		this.spawned = false;
		this.transform.position = position;
		this.spawnAnimation = new DeathAnimation(this.engine, new Vector3(0,0,1));
		this.addChild(this.spawnAnimation);
	}

	private doSpawnAnimation(dt:number):void {
		if (!this.sprite && this.spawnAnimation.getRenderedLocation().x == 2) {
			this.sprite = new BlueBallSprite(this.engine);
			this.sprite.transform.position.x = -SIZE / 2;
			this.sprite.transform.position.y = -SIZE / 2;
			this.addChild(this.sprite);
		}
		if (this.spawnAnimation.getParent() == null) {
			this.spawned = true;
		}
	}

	public update(dt:number):void {
		if (!this.spawned) {
			super.update(dt);
			return this.doSpawnAnimation(dt);
		}

		let room = this.getRoom();
		let player = room.player;

		let xDiff = player.transform.position.x - this.transform.position.x;
		let yDiff = player.transform.position.y - this.transform.position.y;

		let magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

		if (magnitude < 24) {
			xDiff = 0;
			yDiff = 0;
			this.attack();
		}

		if (yDiff > 0) {
			this.velocity.y = approach(this.velocity.y, this.maxSpeed, dt * this.acceleration);
			this.direction = Direction.UP;
		}else if (yDiff < 0) {
			this.velocity.y = approach(this.velocity.y, -this.maxSpeed, dt * this.acceleration);
			this.direction = Direction.DOWN;
		} else {
			this.velocity.y = approach(this.velocity.y, 0, dt * this.acceleration);
		}

		if (xDiff > 0) {
			this.velocity.x = approach(this.velocity.x, this.maxSpeed, dt * this.acceleration);
			this.direction = Direction.RIGHT;
		}else if (xDiff < 0) {
			this.velocity.x = approach(this.velocity.x, -this.maxSpeed, dt * this.acceleration);
			this.direction = Direction.LEFT;
		} else {
			this.velocity.x = approach(this.velocity.x, 0, dt * this.acceleration);
		}

		this.sprite.playWalkAnimation(this.direction);

		if (xDiff == 0 && yDiff == 0) {
			this.sprite.idle();
		}

		super.update(dt);
	}


	public attack():void {
		if (!this.canAttack()) return;
		this.getRoom().player.doDamage(this.damagePerHit);
		super.attack();
	}

	
}