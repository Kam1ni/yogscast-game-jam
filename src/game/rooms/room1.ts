import { Room } from "../entities/room";
import { Door } from "../entities/door";
import { Torch } from "../entities/torch";
import { WallCorner } from "../entities/wall-corner";
import { Direction } from "../utils/direction";
import { Wall } from "../entities/wall";
import { Begar } from "../entities/begar";
import { BlueBall } from "../entities/blue-ball";
import { Vector3 } from "scrapy-engine";
import { WallCornerOuter } from "../entities/wall-corner outer";

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
		this.addEnemy(enemy);

		enemy = new BlueBall(this.engine, new Vector3(200, 50));
		enemy.transform.position.x = 200;
		enemy.transform.position.y = 50;
		this.addEnemy(enemy);

		enemy = new BlueBall(this.engine, new Vector3(200, 100));
		this.addEnemy(enemy);
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

		let corner = new WallCorner(this.engine, -16, -16, Direction.UP);
		this.addWall(corner);

		corner = new WallCorner(this.engine, 256, 128, Direction.DOWN);
		this.addWall(corner);

		corner = new WallCorner(this.engine, 256, -16, Direction.RIGHT);
		this.addWall(corner);

		corner = new WallCorner(this.engine, -16, 128, Direction.LEFT);
		this.addWall(corner);


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

		
		this.addWall(new WallCorner(this.engine, 64 + 16, 128, Direction.DOWN));
		this.addWall(new WallCorner(this.engine, 64 + 32, 128, Direction.LEFT));

		this.addWall(new Wall(this.engine, 64 + 16, 128 - 32, 1, 2, Direction.RIGHT));
		this.addWall(new Wall(this.engine, 64 + 32, 128 - 32, 1, 2, Direction.LEFT));

		this.addWall(new WallCornerOuter(this.engine, 64 + 16, 128-48, Direction.RIGHT));
		this.addWall(new WallCornerOuter(this.engine, 64 + 32, 128-48, Direction.DOWN));

		this.addWall(new WallCorner(this.engine, 128 + 16, -16, Direction.RIGHT));
		this.addWall(new WallCorner(this.engine, 128 + 32, -16, Direction.UP));
		
		this.addWall(new Wall(this.engine, 128 + 16, 0, 1, 2, Direction.RIGHT));
		this.addWall(new Wall(this.engine, 128 + 32, 0, 1, 2, Direction.LEFT));
		
		this.addWall(new WallCornerOuter(this.engine, 128 + 16, 32, Direction.UP));
		this.addWall(new WallCornerOuter(this.engine, 128 + 32, 32, Direction.LEFT));
	}
}