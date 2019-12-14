import { AnimatedSprite, Engine } from "scrapy-engine";

const ANIMATION_INTERVAL = 75;

export class TikiTorchSprite extends AnimatedSprite{
	private lastAnimationChangeState = new Date().getTime();

	public constructor(engine:Engine) {
		super(engine, "tiki-torch.png", 1, 6);
		this.setRenderedLocation(Math.floor(Math.random() * 6), 0);
	}

	public update(dt:number):void {
		if (this.lastAnimationChangeState + ANIMATION_INTERVAL <= new Date().getTime()) {
			this.lastAnimationChangeState = new Date().getTime();
			let renderX = this.getRenderedLocation().x;
			renderX++;
			if (renderX >= 6) {
				renderX = 0;
			}
			this.setRenderedLocation(renderX, 0);
		}

		super.update(dt);
	}
}