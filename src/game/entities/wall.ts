import { SimObject, Engine, Rect, Color, BoundingBox, Vector3, AnimatedSprite } from "scrapy-engine";
import { Direction } from "../utils/direction";

export class Wall extends SimObject {
	public hitbox:BoundingBox;
	protected sprites:AnimatedSprite[] = [];

	public constructor(engine:Engine, x:number, y:number, width:number, height:number, direction:Direction) {
		super(engine);

		this.transform.position.x = x;
		this.transform.position.y = y;
		this.transform.position.z = -4;

		for (let i = 0; i < width; i++) {
			for (let c = 0; c < height; c++) {
				let sprite = new AnimatedSprite(this.engine, "tiles.png", 6, 4);
				sprite.setRenderedLocation(0, 1);
				sprite.transform.position.x = i * 16;
				sprite.transform.position.y = c * 16;
				if (direction == Direction.UP) {
					sprite.transform.rotation.z = Math.PI;
					sprite.transform.position.x += 16;
					sprite.transform.position.y += 16;
				} else if (direction == Direction.LEFT) {
					sprite.transform.rotation.z = Math.PI / 2;
					sprite.transform.position.x += 16;
				} else if (direction == Direction.RIGHT) {
					sprite.transform.rotation.z = -Math.PI / 2;
					sprite.transform.position.y += 16;
				}
				this.addChild(sprite);
				this.sprites.push(sprite);
			}
		}


		this.hitbox = new BoundingBox(this.engine);
		width *= 16;
		height *= 16;
		this.hitbox.size = new Vector3(width, height, 20);
		this.hitbox.transform.position.x = width/2;
		this.hitbox.transform.position.y = height/2;
		this.addChild(this.hitbox);
	}
}