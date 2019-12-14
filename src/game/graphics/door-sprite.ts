import { AnimatedSprite, Engine } from "scrapy-engine";
import { Direction } from "../utils/direction";

export class DoorSprite extends AnimatedSprite{
	public constructor(engine:Engine, direction:Direction) {
		super(engine, "tiles.png", 3, 1);
		this.transform.position.z = -3;
		
		if (direction == Direction.RIGHT) {
			this.transform.rotation.z = Math.PI / 2;
			this.transform.position.x = +16;
			this.transform.position.y = -32;
		} else if (direction == Direction.UP) {
			this.transform.rotation.z = Math.PI;
			this.transform.position.x = +32;
			this.transform.position.y = +16;
		} else if (direction == Direction.LEFT) {
			this.transform.rotation.z = -Math.PI / 2;
			this.transform.position.x = -16;
			this.transform.position.y = +32;
		} else {
			this.transform.position.x = -32;
			this.transform.position.y = -16;
		}
		this.transform.scale.y = .5;

		this.setRenderedLocation(0, 1);
	}

	public open():void {
		this.setRenderedLocation(0, 2);
	}

	public close():void {
		this.setRenderedLocation(0, 1);
	}
}