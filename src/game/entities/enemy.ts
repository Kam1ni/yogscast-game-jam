import { SimObject, Engine, Rect, Color, Vector3, Vector2, approach } from "scrapy-engine";
import { Character } from "./character";
import { Room } from "./room";

const SIZE = 32;

export class Enemy extends Character {
	public sprite:SimObject;
	protected maxSpeed:number = 128;

	public constructor(engine:Engine) {
		super(engine);
		this.sprite = new Rect(this.engine, SIZE, SIZE, Color.red());
		this.sprite.transform.position.x = -SIZE / 2;
		this.sprite.transform.position.y = -SIZE / 2;
		this.addChild(this.sprite);

		this.hitbox.size = new Vector3(SIZE, SIZE, 10);
	}

	public update(dt:number):void {
		let room = this.getRoom();
		let player = room.player;

		let xDiff = player.transform.position.x - this.transform.position.x;
		let yDiff = player.transform.position.y - this.transform.position.y;

		let magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

		if (magnitude < 56) {
			xDiff = 0;
			yDiff = 0;
			this.attackPlayer();
		}

		if (xDiff > 0) {
			this.velocity.x = approach(this.velocity.x, this.maxSpeed, dt * this.acceleration);
		}else if (xDiff < 0) {
			this.velocity.x = approach(this.velocity.x, -this.maxSpeed, dt * this.acceleration);
		} else {
			this.velocity.x = approach(this.velocity.x, 0, dt * this.acceleration);
		}

		if (yDiff > 0) {
			this.velocity.y = approach(this.velocity.y, this.maxSpeed, dt * this.acceleration);
		}else if (yDiff < 0) {
			this.velocity.y = approach(this.velocity.y, -this.maxSpeed, dt * this.acceleration);
		} else {
			this.velocity.y = approach(this.velocity.y, 0, dt * this.acceleration);
		}

		super.update(dt);
	}

	public getRoom():Room {
		return this.getParent() as Room;
	}

	public attackPlayer():void {
		console.log("ATTACKING");
	}
}