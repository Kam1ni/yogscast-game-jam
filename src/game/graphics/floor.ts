import { SimObject, Engine, AnimatedSprite } from "scrapy-engine";

export class Floor extends SimObject {
	public constructor(engine:Engine, cols:number, rows:number) {
		super(engine);
		this.transform.position.z = -5;

		for (let x = 0; x < cols; x++) {
			for (let y = 0; y < rows; y++) {
				let sprite = new AnimatedSprite(engine, "tiles.png", 6, 4);
				sprite.setRenderedLocation(1,0);
				sprite.transform.position.x = x * 16;
				sprite.transform.position.y = y * 16;
				this.addChild(sprite);
			}
		}
	}
}