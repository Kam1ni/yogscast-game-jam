import { GameWorld, Color, Engine } from "scrapy-engine";
import { Room1 } from "../rooms/room1";
import { Player } from "../entities/player";
import { Room2 } from "../rooms/room2";
import { Room3 } from "../rooms/room3";
import { Room4 } from "../rooms/room4";
import { Room5 } from "../rooms/room5";
import { Room6 } from "../rooms/room6";

export class MainWorld extends GameWorld{
	public room1:Room1;
	public room2:Room2;
	public room3:Room3;
	public room4:Room4;
	public room5:Room5;
	public room6:Room6;

	public player:Player;
	public ambientLight = new Color(50, 50, 100);

	public constructor(engine:Engine) {
		super(engine);
		this.transform.position.x = 16;
		this.transform.position.y = 16;
	}

	public async prefetchAssets():Promise<void> {
		try {
			await this.engine.assetLoaders.textureLoader.getLoadedAsset("player.png");
			await this.engine.assetLoaders.textureLoader.getLoadedAsset("death.png");
			await this.engine.assetLoaders.textureLoader.getLoadedAsset("blue-ball.png");
			await this.engine.assetLoaders.textureLoader.getLoadedAsset("heart.png");
			await this.engine.assetLoaders.textureLoader.getLoadedAsset("fireball.png");
			await this.engine.assetLoaders.textureLoader.getLoadedAsset("begar-satisfied.png");
			await this.engine.assetLoaders.audioLoader.getLoadedAsset("door-enter.wav");
			await this.engine.assetLoaders.audioLoader.getLoadedAsset("damage-taken.wav");
			await this.engine.assetLoaders.audioLoader.getLoadedAsset("freed.wav");
			await this.engine.assetLoaders.audioLoader.getLoadedAsset("health.wav");
			await this.engine.assetLoaders.audioLoader.getLoadedAsset("blue-ball-dead.wav");
		}catch (err) {
			console.log(err);
		}
	}

	public stop():void {
		let children = this.getChildren();
		for (let i = children.length - 1; i >= 0; i--) {
			children[i].remove();
		}
	}

	public start():void {
		this.player = new Player(this.engine);
		this.player.transform.position.x = 128;
		this.player.transform.position.y = 64;

		this.room1 = new Room1(this.engine, this.player);
		this.room2 = new Room2(this.engine, this.player);
		this.room3 = new Room3(this.engine, this.player);
		this.room4 = new Room4(this.engine, this.player);
		this.room5 = new Room5(this.engine, this.player);
		this.room6 = new Room6(this.engine, this.player);
		
		this.room1.nextRoom = this.room2;
		this.room1.nextRoomDoor = this.room2.entrance;

		this.room2.prevRoom = this.room1;
		this.room2.prevRoomDoor = this.room1.exitDoor;
		this.room2.nextRoom = this.room3;
		this.room2.nextRoomDoor = this.room3.entrance;

		this.room3.prevRoom = this.room2;
		this.room3.prevRoomDoor = this.room2.exitDoor;
		this.room3.nextRoom = this.room4;
		this.room3.nextRoomDoor = this.room4.entrance;

		this.room4.prevRoom = this.room3;
		this.room4.prevRoomDoor = this.room3.exitDoor;
		this.room4.nextRoom = this.room5;
		this.room4.nextRoomDoor = this.room5.entrance;

		this.room5.prevRoom = this.room4;
		this.room5.prevRoomDoor = this.room4.exitDoor;
		this.room5.nextRoom = this.room6;
		this.room5.nextRoomDoor = this.room6.entrance;

		this.room6.prevRoom = this.room5;
		this.room6.prevRoomDoor = this.room5.exitDoor;

		this.addChild(this.room1);
		this.addChild(this.room2);
		this.addChild(this.room3);
		this.addChild(this.room4);
		this.addChild(this.room5);
		this.addChild(this.room6);
		this.room1.enterRoom(this.room1.entrance);
	}
}