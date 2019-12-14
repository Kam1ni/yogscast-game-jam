import { Room } from "./room";
import { Engine, Keys, BoundingBox } from "scrapy-engine";
import { Player } from "./player";
import { Begar } from "./begar";
import { Direction } from "../utils/direction";
import { Wall } from "./wall";
import { Enemy } from "./enemy";
import { BlueBall } from "./blue-ball";


export class TestRoom extends Room{
	public begar:Begar;
	public constructor(engine:Engine, player:Player) {
		super(engine, player);

		this.begar = new Begar(this.engine);
		this.begar.transform.position.x = 128;
		this.begar.transform.position.y = 128 - 8;
		this.addBegar(this.begar);

		this.addWall(new Wall(this.engine, 0, 128, 256, 16));
		this.addWall(new Wall(this.engine, 0, -16, 256, 16));
		this.addWall(new Wall(this.engine, -16, 0, 16, 128));
		this.addWall(new Wall(this.engine, 256, 0, 16, 128));

		let enemy = new BlueBall(engine);
		enemy.transform.position.x = 50;
		enemy.transform.position.y = 16;
		this.addEnemey(enemy);

		enemy = new BlueBall(engine);
		enemy.transform.position.x = 50;
		enemy.transform.position.y = 50;
		this.addEnemey(enemy);

		enemy = new BlueBall(engine);
		enemy.transform.position.x = 50;
		enemy.transform.position.y = 100;
		this.addEnemey(enemy);

		enemy = new BlueBall(engine);
		enemy.transform.position.x = 200;
		enemy.transform.position.y = 50;
		this.addEnemey(enemy);

		enemy = new BlueBall(engine);
		enemy.transform.position.x = 200;
		enemy.transform.position.y = 100;
		this.addEnemey(enemy);
	}

}