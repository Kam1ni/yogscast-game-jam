import { GameWorld, SimObject, Rect, Color, Engine, Vector2 } from "scrapy-engine";
import { Player } from "../entities/player";
import { Begar } from "../entities/begar";
import { Room } from "../entities/room";
import { TestRoom } from "../entities/test-room";

export class TestWorld extends GameWorld {
	public player:Player;
	public room:Room;

	public constructor(engine:Engine) {
		super(engine);
		this.player = new Player(this.engine);
		this.player.transform.position.x = 256;
		this.player.transform.position.y = 128;

		this.room = new TestRoom(this.engine, this.player);
		this.room.transform.position.x = 128;
		this.room.transform.position.y = 128;
		this.addChild(this.room);

	}

}