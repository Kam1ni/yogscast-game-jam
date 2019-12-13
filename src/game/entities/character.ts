import { SimObject, BoundingBox, Engine, Vector2 } from "scrapy-engine";

export abstract class Character extends SimObject {
	protected maxSpeed = 256;
	protected acceleration = 0.5;

	public hitbox:BoundingBox;
	public velocity:Vector2 = new Vector2();

	public constructor(engine:Engine) {
		super(engine);
		this.hitbox = new BoundingBox(this.engine);
		this.addChild(this.hitbox);
	}


	public update(dt:number):void {
		let dtMilis = dt / 1000;
		this.transform.position.x += this.velocity.x * dtMilis;
		this.transform.position.y += this.velocity.y * dtMilis;
		super.update(dt);
	}


}