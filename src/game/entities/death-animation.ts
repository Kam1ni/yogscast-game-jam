import { AnimatedSprite, Engine, Vector3 } from "scrapy-engine";

const ANIMATION_INTERVAL = 100;

export class DeathAnimation extends AnimatedSprite {
	public lastAnimationEvent = new Date().getTime();

	public constructor(engine:Engine, position:Vector3) {
		super(engine, "death.png", 1, 4);
		this.transform.position.x = position.x - 8;
		this.transform.position.y = position.y - 8;
		this.setRenderedLocation(0,0);
	}
	
	public update(dt:number):void {
		if (this.lastAnimationEvent + ANIMATION_INTERVAL <= new Date().getTime()) {
			this.lastAnimationEvent = new Date().getTime();
			let renderX = this.getRenderedLocation().x;
			renderX++;
			if (renderX > 3) {
				this.destroy();
			}
			this.setRenderedLocation(renderX, 0);
		}
		super.update(dt);
	}
}