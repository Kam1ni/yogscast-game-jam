import { SimObject, Engine, Rect, Color, BoundingBox, Vector3 } from "scrapy-engine";

export class Wall extends SimObject {
	public sprite:SimObject;
	public hitBox:BoundingBox;

	public constructor(engine:Engine, x:number, y:number, width:number, height:number) {
		super(engine);

		this.transform.position.x = x;
		this.transform.position.y = y;

		this.sprite = new Rect(engine, width, height, new Color(100, 100, 100));
		this.addChild(this.sprite);

		this.hitBox = new BoundingBox(this.engine);
		this.hitBox.size = new Vector3(width, height, 20);
		this.hitBox.transform.position.x = width/2;
		this.hitBox.transform.position.y = height/2;
		this.addChild(this.hitBox);
	}
}