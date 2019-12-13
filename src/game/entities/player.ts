import { SimObject, Rect, Engine, Color, Vector3, Vector2, Keys, approach, BoundingBox } from "scrapy-engine";

const MAX_SPEED = 256;
const ACCELERATION = 0.5;
const SIZE = 32;

export class Player extends SimObject{	
	public sprite:SimObject;
	public velocity:Vector2 = new Vector2();
	public hitbox:BoundingBox;

	public constructor(engine:Engine) {
		super(engine);
		this.sprite = new Rect(this.engine, SIZE, SIZE, Color.blue());
		this.sprite.transform.position.x = -SIZE / 2;
		this.sprite.transform.position.y = -SIZE / 2;
		this.addChild(this.sprite);

		this.hitbox = new BoundingBox(this.engine);
		this.hitbox.size = new Vector3(SIZE, SIZE, 10);
		this.hitbox.color = Color.red();
		this.addChild(this.hitbox);
	}

	public update(dt:number):void {
		let dtMilis = dt/1000.0;
		let targetX = 0;
		let targetY = 0;

		if (this.engine.input.isKeyDown(Keys.D)) {
			targetX = MAX_SPEED;
		}else if (this.engine.input.isKeyDown(Keys.A)) {
			targetX = -MAX_SPEED;
		}else {
			targetX = 0;
		}

		if (this.engine.input.isKeyDown(Keys.W)) {
			targetY = MAX_SPEED;
		}else if (this.engine.input.isKeyDown(Keys.S)) {
			targetY = -MAX_SPEED;
		}else {
			targetY = 0;
		}

		this.velocity.x = approach(this.velocity.x, targetX, dt * ACCELERATION);
		this.velocity.y = approach(this.velocity.y, targetY, dt * ACCELERATION);

		this.transform.position.x += this.velocity.x * dtMilis;
		this.transform.position.y += this.velocity.y * dtMilis;

		super.update(dt);
	}
}