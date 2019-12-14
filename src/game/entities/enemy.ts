import { SimObject, Engine, Rect, Color, Vector3, Vector2, approach } from "scrapy-engine";
import { Character } from "./character";
import { Room } from "./room";
import { eventBus } from "@/utils/event-bus";

const SIZE = 16;

export abstract class Enemy extends Character {
	protected maxSpeed:number = 64;
	protected damagePerHit:number = 1;

	public constructor(engine:Engine) {
		super(engine);
		this.hitbox.size = new Vector3(SIZE, SIZE, 10);
	}

	public kill():void {
		this.getRoom().removeEnemy(this);
		eventBus.emit("score", this.maxHealth * 10);
		super.destroy();
	}
}