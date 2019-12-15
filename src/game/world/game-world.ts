import { GameWorld, Color, Engine } from "scrapy-engine";
import { Room1 } from "../rooms/room1";
import { Player } from "../entities/player";
import { Room } from "../entities/room";
import { Room2 } from "../rooms/room2";

export class MainWorld extends GameWorld{
	public room1:Room1;
	public room2:Room2;

	public player:Player;
	public ambientLight = new Color(50, 50, 100);

	public constructor(engine:Engine) {
		super(engine);
		this.transform.position.x = 16;
		this.transform.position.y = 16;
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
		await this.engine.assetLoaders.audioLoader.getLoadedAsset("door-enter.wav");
		await this.engine.assetLoaders.audioLoader.getLoadedAsset("damage-taken.wav");
		await this.engine.assetLoaders.audioLoader.getLoadedAsset("freed.wav");
		await this.engine.assetLoaders.audioLoader.getLoadedAsset("health.wav");
		await this.engine.assetLoaders.audioLoader.getLoadedAsset("blue-ball-dead.wav");
		
		console.log("STARTED");
		this.room1 = new Room1(this.engine, this.player);
		
		this.room2 = new Room2(this.engine, this.player);
		this.room1.nextRoom = this.room2;
		this.room1.nextRoomDoor = this.room2.entrance;
		this.room2.prevRoom = this.room1;
		this.room2.prevRoomDoor = this.room1.exitDoor;


		this.addChild(this.room1);
		this.addChild(this.room2);
		this.room1.enterRoom(this.room1.entrance);
	}
}