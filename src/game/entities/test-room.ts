import { Room } from "./room";
import { Engine, Keys, BoundingBox } from "scrapy-engine";
import { Player } from "./player";
import { Begar } from "./begar";
import { Direction } from "../utils/direction";
import { Wall } from "./wall";
import { Enemy } from "./enemy";


export class TestRoom extends Room{
	public begar:Begar;
	public constructor(engine:Engine, player:Player) {
		super(engine, player);

		this.begar = new Begar(this.engine);
		this.begar.transform.position.x = 256;
		this.begar.transform.position.y = 256 - 16;
		this.addBegar(this.begar);

		this.addWall(new Wall(this.engine, 0, 256, 512, 32));
		this.addWall(new Wall(this.engine, 0, -32, 512, 32));
		this.addWall(new Wall(this.engine, -32, 0, 32, 256));
		this.addWall(new Wall(this.engine, 512, 0, 32, 256));

		let enemy = new Enemy(engine);
		this.addEnemey(enemy);
	}

}