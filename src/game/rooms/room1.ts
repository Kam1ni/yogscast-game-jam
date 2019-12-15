import { Room } from "../entities/room";
import { Door } from "../entities/door";
import { Torch } from "../entities/torch";
import { WallCorner } from "../entities/wall-corner";
import { Direction } from "../utils/direction";
import { Wall } from "../entities/wall";
import { Begar } from "../entities/begar";
import { BlueBall } from "../entities/blue-ball";
import { Vector3 } from "scrapy-engine";

export class Room1 extends Room {
	public begar:Begar;
	public entrance:Door;
	public exitDoor:Door;
	public nextRoom:Room;
	public nextRoomDoor:Door;

	public exited(door:Door): void {
		if (door == this.exitDoor) {
			this.nextRoom.enterRoom(this.nextRoomDoor);
		}else {
			this.enterRoom(door);
		}
	}

	public addEnemies(): void {
		let enemy = new BlueBall(this.engine, new Vector3(200, 16));
		this.addEnemey(enemy);

		enemy = new BlueBall(this.engine, new Vector3(200, 50));
		enemy.transform.position.x = 200;
		enemy.transform.position.y = 50;
		this.addEnemey(enemy);

		enemy = new BlueBall(this.engine, new Vector3(200, 100));
		this.addEnemey(enemy);
	}

	public buildLevel(): void {
		this.begar = new Begar(this.engine, "honeydew");
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

		this.entrance = new Door(this.engine, Direction.RIGHT);
		this.entrance.transform.position.x = 0;
		this.entrance.transform.position.y= 64;
		this.addDoor(this.entrance);

		this.exitDoor = new Door(this.engine, Direction.LEFT);
		this.exitDoor.transform.position.x = 256;
		this.exitDoor.transform.position.y = 64;
		this.addDoor(this.exitDoor);
	}
}