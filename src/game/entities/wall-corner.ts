import { Wall } from "./wall";
import { Engine, SimObject, AnimatedSprite } from "scrapy-engine";
import { Direction } from "../utils/direction";

export class WallCorner extends Wall{
	public constructor(engine:Engine, x:number, y:number, direction:Direction) {
		super(engine, x, y, 1, 1, direction);
		this.transform.position.z = -3;
		this.sprites.forEach(s=>s.setRenderedLocation(1,1));
	}
}