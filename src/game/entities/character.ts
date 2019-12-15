import { SimObject, BoundingBox, Engine, Vector2, Audio } from "scrapy-engine";
import { Room } from "./room";

export abstract class Character extends SimObject {
	public maxSpeed = 256;
	protected acceleration = 0.5;
	protected attackInterval = 1000;
	protected lastAttackTime = new Date().getTime();
	protected maxHealth = 1;
	public health = 1;

	public hitbox:BoundingBox;
	public velocity:Vector2 = new Vector2();

	public damageSound:Audio;

	public constructor(engine:Engine) {
		super(engine);
		this.health = this.maxHealth;
		this.hitbox = new BoundingBox(this.engine);
		this.damageSound = this.engine.assetLoaders.audioLoader.getAsset("damage-taken.wav");
		this.addChild(this.hitbox);
	}


	public update(dt:number):void {
		let dtMilis = dt / 1000;
		this.transform.position.x += this.velocity.x * dtMilis;
		this.transform.position.y += this.velocity.y * dtMilis;
		super.update(dt);
	}

	public attack():void {
		this.lastAttackTime = new Date().getTime();
	}
	
	public canAttack():boolean {
		if (this.lastAttackTime + this.attackInterval > new Date().getTime()) {
			return false;
		}
		return true;
	}
	
	public getRoom():Room {
		return this.getParent() as Room;
	}

	public abstract kill():void;

	public doDamage(damage:number):void {
		this.health -= damage;
		this.damageSound.play();
		if (this.health <= 0) {
			this.health = 0;
			this.kill();
		}
	}
}