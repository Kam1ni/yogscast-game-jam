import { SimObject, Engine, BoundingBox, Rect, Color } from "scrapy-engine";
import { Character } from "./character";
import { Direction } from "../utils/direction";
import { ProjectSprite } from "../graphics/projectile-sprite";

export class Projectile extends SimObject {
	protected speed = 256;
	public damage = 1;
	public sender:Character;
	public direction:Direction;
	public hitbox:BoundingBox;
	public sprite:ProjectSprite;

	public constructor(engine:Engine, sender:Character, direction:Direction) {
		super(engine);
		this.sender = sender;
		this.direction = direction;
		this.sprite = new ProjectSprite(this.engine, direction);
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