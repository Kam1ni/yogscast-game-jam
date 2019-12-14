import { AnimatedSprite, Engine } from "scrapy-engine";
import { Direction } from "../utils/direction";

const COLS = 4;
const ANIMATION_INTERVAL = 100;

export class BlueBallSprite extends AnimatedSprite{
	private lastWalkAnimationUpdate = new Date().getTime();
	private direction:Direction = Direction.RIGHT;
	private isIdle = false;

	public constructor(engine:Engine) {
		super(engine, "blue-ball.png", 4, COLS);
	}

	private getAnimationPositionY(direction:Direction):number {
		if (direction == Direction.UP) {
			return 1;
		}
		if (direction == Direction.DOWN) {
			return 0;
		}
		if (direction == Direction.RIGHT) {
			return 2;
		}
		return 3;
	}

	public playWalkAnimation(direction:Direction):void {
		this.isIdle = false;
		if (direction != this.direction) {
			this.lastWalkAnimationUpdate = new Date(0).getTime();
			this.direction = direction;
			this.setRenderedLocation(0, this.getAnimationPositionY(direction));
		}
	}

	public idle():void {
		let renderLocation = this.getRenderedLocation();
		this.isIdle = true;
		this.setRenderedLocation(0, renderLocation.y);
	}

	public update(dt:number):void {
		let timeDiff = new Date().getTime() - this.lastWalkAnimationUpdate;
		if (timeDiff > ANIMATION_INTERVAL && !this.isIdle) {
			this.lastWalkAnimationUpdate = new Date().getTime();
			let animationPosition = this.getRenderedLocation();
			animationPosition.x++;
			if (animationPosition.x >= COLS) {
				animationPosition.x = 0;
			}
			this.setRenderedLocation(animationPosition.x, animationPosition.y);
		}
		super.update(dt);
	}
}