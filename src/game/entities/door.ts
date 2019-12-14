import { SimObject, Engine, BoundingBox, Color } from "scrapy-engine";
import { DoorSprite } from "../graphics/door-sprite";
import { Direction } from "../utils/direction";

export class Door extends SimObject {
	public sprite:DoorSprite;
	public hitbox:BoundingBox;

	public constructor(engine:Engine, direction:Direction) {
		super(engine);
		this.sprite = new DoorSprite(engine, direction);
		this.addChild(this.sprite);
		
		this.hitbox = new BoundingBox(this.engine);
		this.hitbox.size.x = 64;
		this.hitbox.size.y = 32;
		this.hitbox.color = Color.red();
		if (direction == Direction.LEFT || direction == Direction.RIGHT) {
			this.hitbox.size.x = 32;
			this.hitbox.size.y = 64;
		}
		this.addChild(this.hitbox);
	}

}