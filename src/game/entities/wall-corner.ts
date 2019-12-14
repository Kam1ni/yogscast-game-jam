import { Wall } from "./wall";
import { Engine, SimObject, AnimatedSprite } from "scrapy-engine";
import { Direction } from "../utils/direction";

export class WallCorner extends AnimatedSprite{
	public constructor(engine:Engine, x:number, y:number, direction:Direction) {
		super(engine, "tiles.png", 4, 4);
		this.setRenderedLocation(1,1);

		if (direction == Direction.UP) {
			this.transform.rotation.z = Math.PI;
		} else if (direction == Direction.LEFT) {
			this.transform.rotation.z = Math.PI / 2;
		} else if (direction == Direction.RIGHT) {
			this.transform.rotation.z = -Math.PI / 2;
		}
	}
}