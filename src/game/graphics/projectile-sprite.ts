import { AnimatedSprite, Engine } from "scrapy-engine";
import { Direction } from "../utils/direction";

const ANIMATION_INTERVAL = 50;

export class ProjectSprite extends AnimatedSprite{
	private lastAnimationStateChange = new Date().getTime();

	public constructor(engine:Engine, direction:Direction) {
		super(engine, "fireball.png", 1, 2);
		if (direction == Direction.UP) {
			this.transform.rotation.z = Math.PI/ 2;
			this.transform.position.x += 4;
		} else if  (direction == Direction.LEFT) {
			this.transform.rotation.z = Math.PI;
			this.transform.position.y += 4;
		} else if (direction == Direction.DOWN) {
			this.transform.rotation.z = -Math.PI / 2;
			this.transform.position.x -= 4;
		} else {
			this.transform.position.y -= 4;
		}

		this.setRenderedLocation(0, 0);
	}

	public update(dt:number):void {
		if (this.lastAnimationStateChange + ANIMATION_INTERVAL <= new Date().getTime()) {
			this.lastAnimationStateChange = new Date().getTime();

			let renderX = this.getRenderedLocation().x;
			renderX++;
			if (renderX > 1) {
				renderX = 0;
			}
			this.setRenderedLocation(renderX, 0);
		}

		super.update(dt);
	}


}