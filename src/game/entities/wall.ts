import { SimObject, Engine, Rect, Color, BoundingBox, Vector3 } from "scrapy-engine";

export class Wall extends SimObject {
	public sprite:SimObject;
	public hitbox:BoundingBox;

	public constructor(engine:Engine, x:number, y:number, width:number, height:number) {
		super(engine);

		this.transform.position.x = x;
		this.transform.position.y = y;

		this.sprite = new Rect(engine, width, height, new Color(100, 100, 100));
		this.addChild(this.sprite);

		this.hitbox = new BoundingBox(this.engine);
		this.hitbox.size = new Vector3(width, height, 20);
		this.hitbox.transform.position.x = width/2;
		this.hitbox.transform.position.y = height/2;
		this.addChild(this.hitbox);
	}
}