import { SimObject, Engine, Rect, Color, BoundingBox, Vector3 } from "scrapy-engine";
import { Player } from "./player";
import { eventBus } from "@/utils/event-bus";

const SIZE = 16;

export class Begar extends SimObject {
	public need:number = 1;
	public sprite:SimObject;
	public hitbox:BoundingBox;

	public constructor(engine:Engine) {
		super(engine);
		this.sprite = new Rect(this.engine, SIZE, SIZE, Color.green());
		this.sprite.transform.position.x = -SIZE / 2;
		this.sprite.transform.position.y = -SIZE / 2;

		this.hitbox = new BoundingBox(this.engine);
		this.hitbox.size = new Vector3(SIZE, SIZE, 10);
		this.hitbox.color = Color.red();
		this.addChild(this.hitbox);

		this.addChild(this.sprite);
	}

	public giveHealth(player:Player):void {
		if (this.need >= player.health) {
			return;
		}

		player.doDamage(this.need);
		eventBus.emit("score", this.need * 100);
		this.need = 0;
	}
}