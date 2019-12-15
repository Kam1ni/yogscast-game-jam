import { Wall } from "./wall";
import { Engine, SimObject, AnimatedSprite } from "scrapy-engine";
import { Direction } from "../utils/direction";

export class WallCornerOuter extends Wall{
	public constructor(engine:Engine, x:number, y:number,  direction:Direction) {
		super(engine, x, y, 1, 1, direction);
		this.transform.position.z = -3;
		this.sprites.forEach(s=>s.setRenderedLocation(2,1));
	}
}