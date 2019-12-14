import { SimObject, Engine, BoundingBox, Color, Matrix4x4, Vector3 } from "scrapy-engine";
import { DoorSprite } from "../graphics/door-sprite";
import { Direction } from "../utils/direction";

export class Door extends SimObject {
	public sprite:DoorSprite;
	public hitbox:BoundingBox;
	public entranceHitbox:BoundingBox;
	public direction:Direction;
	private isOpen:boolean;
	

	public constructor(engine:Engine, direction:Direction) {
		super(engine);
		this.direction = direction;
		this.sprite = new DoorSprite(engine, direction);
		this.addChild(this.sprite);

		this.entranceHitbox = new BoundingBox(this.engine);
		this.entranceHitbox.size.x = 32;
		this.entranceHitbox.size.y = 32;
		this.entranceHitbox.color = Color.blue();
		this.addChild(this.entranceHitbox);
		
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

	public getSpawnPointBeginOffset():Vector3 {
		let point = this.getSpawnPointOffset();
		point.x /= 4;
		point.y /= 4;
		return point;
	}

	public getSpawnPointOffset():Vector3 {
		if (this.direction == Direction.RIGHT) {
			return new Vector3(24, 0, 0);
		}
		if (this.direction == Direction.LEFT) {
			return new Vector3(-24, 0, 0);
		}
		if (this.direction == Direction.UP) {
			return new Vector3(0, 24, 0);
		}
		return new Vector3(0, -24, 0);
	}

	public open():void {
		this.isOpen = true;
		this.sprite.open();
	}

	public close():void {
		this.isOpen = false;
		this.sprite.close();
	}

	public getIsOpen():boolean {
		return this.isOpen;
	}

}