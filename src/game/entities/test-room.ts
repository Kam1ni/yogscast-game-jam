import { Room } from "./room";
import { Engine, Keys, BoundingBox } from "scrapy-engine";
import { Player } from "./player";
import { Begar } from "./begar";
import { Direction } from "../utils/direction";
import { Wall } from "./wall";
import { Enemy } from "./enemy";
import { BlueBall } from "./blue-ball";
import { WallCorner } from "./wall-corner";
import { Torch } from "./torch";


export class TestRoom extends Room{
	public begar:Begar;
	public constructor(engine:Engine, player:Player) {
		super(engine, player);

		this.begar = new Begar(this.engine);
		this.begar.transform.position.x = 128;
		this.begar.transform.position.y = 128 - 8;
		this.addBegar(this.begar);

		this.addWall(new Wall(this.engine, 0, 128, 16, 1, Direction.DOWN));
		this.addWall(new Wall(this.engine, 0, -16, 16, 1,  Direction.UP));
		this.addWall(new Wall(this.engine, -16, 0, 1, 8, Direction.LEFT));
		this.addWall(new Wall(this.engine, 256, 0, 1, 8, Direction.RIGHT));

		let corner = new WallCorner(this.engine, 0, 0, Direction.UP);
		corner.transform.position.x = 0;
		corner.transform.position.y = 0;
		this.addChild(corner);

		corner = new WallCorner(this.engine, 0, 0, Direction.DOWN);
		corner.transform.position.x = 256;
		corner.transform.position.y = 128;
		this.addChild(corner);

		corner = new WallCorner(this.engine, 0, 0, Direction.RIGHT);
		corner.transform.position.x = 256;
		corner.transform.position.y = 0;
		this.addChild(corner);

		corner = new WallCorner(this.engine, 0, 0, Direction.LEFT);
		corner.transform.position.x = 0;
		corner.transform.position.y = 128;
		this.addChild(corner);

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

		let torch = new Torch(engine);
		torch.transform.position.x = 8;
		torch.transform.position.y = 120;
		this.addChild(torch);

		torch = new Torch(engine);
		torch.transform.position.x = 248;
		torch.transform.position.y = 120;
		this.addChild(torch);

		torch = new Torch(engine);
		torch.transform.position.x = 248;
		torch.transform.position.y = 8;
		this.addChild(torch);

		torch = new Torch(engine);
		torch.transform.position.x = 8;
		torch.transform.position.y = 8;
		this.addChild(torch);
	}

}