import { SimObject, Engine, Rect, Color, BoundingBox, Vector3, Sprite } from "scrapy-engine";
import { Player } from "./player";
import { eventBus } from "@/utils/event-bus";
import { BegarSatisfiedAnimation } from "./begar-satisfied-animation";

const SIZE = 16;

const BEGAR_SKINS = ["honeydew", "xephos", "duncan", "sips", "sjin", "kim"];

export class Begar extends SimObject {
	public need:number = 1;
	public sprite:SimObject;
	public hitbox:BoundingBox;

	public constructor(engine:Engine) {
		super(engine);
		let skin = BEGAR_SKINS[Math.floor(Math.random() * BEGAR_SKINS.length)];
		this.sprite = new Sprite(this.engine, `${skin}.png`);
		this.sprite.transform.position.x = -SIZE / 2;
		this.sprite.transform.position.y = -SIZE / 2;

		this.hitbox = new BoundingBox(this.engine);
		this.hitbox.size = new Vector3(SIZE, SIZE, 10);
		this.hitbox.color = Color.red();
		this.addChild(this.hitbox);

		this.addChild(this.sprite);
	}

	public giveHealth(player:Player):boolean {
		if (this.need >= player.health) {
			return false;
		}

		eventBus.emit("score", this.need * 100);
		player.doDamage(this.need);

		this.getParent().addChild(new BegarSatisfiedAnimation(this.engine, this.transform.position));
		this.destroy();
		return true;
	}
}