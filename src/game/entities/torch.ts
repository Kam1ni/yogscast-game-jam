import { SimObject, Engine, PointLight } from "scrapy-engine";
import { TikiTorchSprite } from "../graphics/tiki-torch-sprite";

const LIGHT_INTENSITIES = [35500, 35000, 36000, 35500, 35700, 35300];

export class Torch extends SimObject{
	public sprite:TikiTorchSprite;
	public light:PointLight;

	public constructor(engine:Engine) {
		super(engine);

		this.sprite = new TikiTorchSprite(this.engine);
		this.sprite.transform.position.x = -8;
		this.sprite.transform.position.y = -6;
		this.sprite.transform.position.z = -1;
		this.addChild(this.sprite);

		this.light = new PointLight(this.engine);
		this.pointLights.push(this.light);
	}

	public update(dt:number):void {
		this.light.color.alpha = LIGHT_INTENSITIES[this.sprite.getRenderedLocation().x];
		super.update(dt);
	}
}