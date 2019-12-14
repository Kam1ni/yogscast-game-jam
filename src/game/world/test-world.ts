import { GameWorld, SimObject, Rect, Color, Engine, Vector2, Shader } from "scrapy-engine";
import { Player } from "../entities/player";
import { Begar } from "../entities/begar";
import { Room } from "../entities/room";
import { TestRoom } from "../rooms/test-room";

export class TestWorld extends GameWorld {
	public player:Player;
	public room:Room;
	public ambientLight = new Color(50, 50, 100);

	public constructor(engine:Engine) {
		super(engine);
		this.player = new Player(this.engine);
		this.player.transform.position.x = 128;
		this.player.transform.position.y = 64;

		this.engine.assetLoaders.textureLoader.getAsset("player.png");

		let room = new TestRoom(this.engine, this.player);
		this.room = room;
		this.room.transform.position.x = 64;
		this.room.transform.position.y = 64;
		this.addChild(this.room);
		room.enterRoom(room.entrance);
	}

}