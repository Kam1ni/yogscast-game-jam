import { Sprite, Engine, Vector3, BoundingBox, Color, Audio } from "scrapy-engine";

export class Heart extends Sprite {
	public hitbox:BoundingBox;
	public soundEfect:Audio;

	public constructor(engine:Engine, position:Vector3) {
		super(engine, "heart.png");
		this.transform.position = position.add(new Vector3(-4, -4, 0));
		this.hitbox = new BoundingBox(this.engine);
		this.hitbox.size.x = 8;
		this.hitbox.size.y = 8;
		this.hitbox.transform.position.x = 4;
		this.hitbox.transform.position.y = 4;
		this.hitbox.color = Color.red();
		this.addChild(this.hitbox);

		this.soundEfect = engine.assetLoaders.audioLoader.getAsset("health.wav");
	}
}