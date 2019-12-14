import { AnimatedSprite, Engine, Vector3 } from "scrapy-engine";

const ANIMATION_INTERVAL = 200;


export class BegarSatisfiedAnimation extends AnimatedSprite{
	public lastAnimationEvent = new Date().getTime();

	public constructor(engine:Engine, position:Vector3) {
		super(engine, "begar-satisfied.png", 1, 5);
		this.transform.position.x = position.x - 8;
		this.transform.position.y = position.y - 8;
		this.setRenderedLocation(0,0);
	}
	
	public update(dt:number):void {
		if (this.lastAnimationEvent + ANIMATION_INTERVAL <= new Date().getTime()) {
			this.lastAnimationEvent = new Date().getTime();
			let renderX = this.getRenderedLocation().x;
			renderX++;
			if (renderX > 4) {
				this.destroy();
			}
			this.setRenderedLocation(renderX, 0);
		}
		super.update(dt);
	}
}