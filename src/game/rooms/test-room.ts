import { Room } from "../entities/room";
import { Engine, Keys, BoundingBox } from "scrapy-engine";
import { Player } from "../entities/player";
import { Begar } from "../entities/begar";
import { Direction } from "../utils/direction";
import { Wall } from "../entities/wall";
import { Enemy } from "../entities/enemy";
import { BlueBall } from "../entities/blue-ball";
import { WallCorner } from "../entities/wall-corner";
import { Torch } from "../entities/torch";
import { Door } from "../entities/door";


export class TestRoom extends Room{
	public begar:Begar;
	public entrance:Door;

	public buildLevel():void {
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


		let torch = new Torch(this.engine);
		torch.transform.position.x = 8;
		torch.transform.position.y = 120;
		this.addChild(torch);

		torch = new Torch(this.engine);
		torch.transform.position.x = 248;
		torch.transform.position.y = 120;
		this.addChild(torch);

		torch = new Torch(this.engine);
		torch.transform.position.x = 248;
		torch.transform.position.y = 8;
		this.addChild(torch);

		torch = new Torch(this.engine);
		torch.transform.position.x = 8;
		torch.transform.position.y = 8;
		this.addChild(torch);

		let door = new Door(this.engine, Direction.RIGHT);
		door.transform.position.x = 0;
		door.transform.position.y= 64;
		this.addDoor(door);
		this.entrance = door;
	}

	public addEnemies(): void {
		let enemy = new BlueBall(this.engine);
		enemy.transform.position.x = 50;
		enemy.transform.position.y = 16;
		this.addEnemey(enemy);

		enemy = new BlueBall(this.engine);
		enemy.transform.position.x = 50;
		enemy.transform.position.y = 50;
		this.addEnemey(enemy);

		enemy = new BlueBall(this.engine);
		enemy.transform.position.x = 50;
		enemy.transform.position.y = 100;
		this.addEnemey(enemy);

		enemy = new BlueBall(this.engine);
		enemy.transform.position.x = 200;
		enemy.transform.position.y = 50;
		this.addEnemey(enemy);

		enemy = new BlueBall(this.engine);
		enemy.transform.position.x = 200;
		enemy.transform.position.y = 100;
		this.addEnemey(enemy);
	}
}