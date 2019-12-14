import { Enemy } from "./enemy";
import { approach, Engine } from "scrapy-engine";
import { BlueBallSprite } from "../graphics/blue-ball-sprite";
import { Direction } from "../utils/direction";

const SIZE = 16;

export class BlueBall extends Enemy {
	public sprite:BlueBallSprite;
	public direction:Direction = Direction.LEFT;

	public constructor(engine:Engine) {
		super(engine);
		this.sprite = new BlueBallSprite(engine);
		this.sprite.transform.position.x = -SIZE / 2;
		this.sprite.transform.position.y = -SIZE / 2;
		this.addChild(this.sprite);
	}


	public update(dt:number):void {
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