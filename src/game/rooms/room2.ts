import { Room } from "../entities/room";
import { Begar } from "../entities/begar";
import { Vector3 } from "scrapy-engine";
import { BlueBall } from "../entities/blue-ball";
import { WallCorner } from "../entities/wall-corner";
import { Direction } from "../utils/direction";
import { Torch } from "../entities/torch";
import { Door } from "../entities/door";
import { Wall } from "../entities/wall";
import { WallCornerOuter } from "../entities/wall-corner outer";

export class Room2 extends Room {
	public begar:Begar;
	public entrance:Door;
	public exitDoor:Door;
	public nextRoom:Room;
	public nextRoomDoor:Door;
	public prevRoom:Room;
	public prevRoomDoor:Door;

	public addEnemies(): void {
		this.addEnemy(new BlueBall(this.engine, new Vector3(150, 16)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(150, 50)));

		this.addEnemy(new BlueBall(this.engine, new Vector3(150, 100)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(230, 16)));
	}

	public buildLevel(): void {
		this.begar = new Begar(this.engine, "xephos");
		this.begar.transform.position.x = 248-16;
		this.begar.transform.position.y = 120;
		this.addBegar(this.begar);
		this.buildDefaultWall();


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

		this.exitDoor = new Door(this.engine, Direction.DOWN);
		this.exitDoor.transform.position.x = 128;
		this.exitDoor.transform.position.y = 128;
		this.addDoor(this.exitDoor);

		let x = 128 + 32;
		let y = 128;
		this.addWall(new WallCorner(this.engine, x + 16, y, Direction.DOWN));
		this.addWall(new WallCorner(this.engine, x + 32, y, Direction.LEFT));

		this.addWall(new Wall(this.engine, x + 16, y - 32, 1, 2, Direction.RIGHT));
		this.addWall(new Wall(this.engine, x + 32, y - 32, 1, 2, Direction.LEFT));

		this.addWall(new WallCornerOuter(this.engine, x + 16, y-48, Direction.RIGHT));
		this.addWall(new WallCornerOuter(this.engine, x + 32, y-48, Direction.DOWN));

		x = 128 + 32;
		y = 0;
		this.addWall(new WallCorner(this.engine, x + 16, y -16, Direction.RIGHT));
		this.addWall(new WallCorner(this.engine, x + 32, y -16, Direction.UP));
		
		this.addWall(new Wall(this.engine, x + 16, y, 1, 2, Direction.RIGHT));
		this.addWall(new Wall(this.engine, x + 32, y, 1, 2, Direction.LEFT));
		
		this.addWall(new WallCornerOuter(this.engine, x + 16, y + 32, Direction.UP));
		this.addWall(new WallCornerOuter(this.engine, x + 32, y + 32, Direction.LEFT));
	}

	public exited(door: Door): void {
		if (door == this.exitDoor) {
			this.nextRoom.enterRoom(this.nextRoomDoor);
		}else {
			this.prevRoom.enterRoom(this.prevRoomDoor);
		}
	}
}