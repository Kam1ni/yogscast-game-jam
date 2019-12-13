import { GameWorld, SimObject, Rect, Color, Engine, Vector2 } from "scrapy-engine";
import { Player } from "../entities/player";
import { Begar } from "../entities/begar";

export class TestWorld extends GameWorld {
	public background:SimObject;
	public player:Player;
	public begar:Begar;

	public constructor(engine:Engine) {
		super(engine);
		
		this.background = new Rect(engine, 512, 256, Color.white());
		this.background.transform.position.z = -5;
		this.addChild(this.background);

		this.player = new Player(this.engine);
		this.player.transform.position.x = 256;
		this.player.transform.position.y = 128;
		this.addChild(this.player);

		this.begar = new Begar(this.engine);
		this.begar.transform.position.x = 256;
		this.begar.transform.position.y = 256 - 16;
		this.addChild(this.begar);
	}

}