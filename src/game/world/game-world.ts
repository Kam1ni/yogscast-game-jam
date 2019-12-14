import { GameWorld, Color, Engine } from "scrapy-engine";
import { Room1 } from "../rooms/room1";
import { Player } from "../entities/player";
import { Room } from "../entities/room";

export class MainWorld extends GameWorld{
	public room1:Room1;

	public player:Player;
	public ambientLight = new Color(50, 50, 100);

	public constructor(engine:Engine) {
		super(engine);
		this.player = new Player(this.engine);
		this.player.transform.position.x = 128;
		this.player.transform.position.y = 64;

		this.start();
	}

	public async start():Promise<void> {
		console.log("STARTING");
		await this.engine.assetLoaders.textureLoader.getLoadedAsset("player.png");
		await this.engine.assetLoaders.textureLoader.getLoadedAsset("death.png");
		await this.engine.assetLoaders.textureLoader.getLoadedAsset("blue-ball.png");
		await this.engine.assetLoaders.textureLoader.getLoadedAsset("heart.png");
		await this.engine.assetLoaders.textureLoader.getLoadedAsset("fireball.png");
		
		console.log("STARTED");
		this.room1 = new Room1(this.engine, this.player);
		this.room1.transform.position.x = 64;
		this.room1.transform.position.y = 64;
		this.addChild(this.room1);
		this.room1.enterRoom(this.room1.entrance);
	}

}