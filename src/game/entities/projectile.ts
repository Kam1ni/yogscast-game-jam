import { SimObject, Engine, BoundingBox, Rect, Color } from "scrapy-engine";
import { Character } from "./character";
import { Direction } from "../utils/direction";

export class Projectile extends SimObject {
	protected speed = 512;
	public damage = 1;
	public sender:Character;
	public direction:Direction;
	public hitbox:BoundingBox;
	public sprite:SimObject;

	public constructor(engine:Engine, sender:Character) {
		super(engine);
		this.sender = sender;
		this.sprite = new Rect(this.engine, 10, 10, Color.black());
		this.sprite.transform.position.x = -5;
		this.sprite.transform.position.y = -5;
		this.addChild(this.sprite);

		this.hitbox = new BoundingBox(this.engine);
		this.hitbox.size.x = 10;
		this.hitbox.size.y = 10;
		this.addChild(this.hitbox);
	}

	public update(dt:number):void {
		let dtMilis = dt / 1000;
		if (this.direction == Direction.UP) {
			this.transform.position.y += this.speed * dtMilis;
		} else if (this.direction == Direction.DOWN) {
			this.transform.position.y -= this.speed * dtMilis;
		} else if (this.direction == Direction.LEFT) {
			this.transform.position.x -= this.speed * dtMilis;
		} else {
			this.transform.position.x += this.speed * dtMilis;
		}
		super.update(dt);
	}
}