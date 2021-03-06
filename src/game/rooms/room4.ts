import { Room } from "../entities/room";
import { Torch } from "../entities/torch";
import { Direction } from "../utils/direction";
import { WallCorner } from "../entities/wall-corner";
import { Wall } from "../entities/wall";
import { Begar } from "../entities/begar";
import { BlueBall } from "../entities/blue-ball";
import { Vector3 } from "scrapy-engine";
import { Door } from "../entities/door";
import { WallCornerOuter } from "../entities/wall-corner outer";

export class Room4 extends Room{
	public begar:Begar;
	public entrance:Door;
	public exitDoor:Door;
	public nextRoom:Room;
	public nextRoomDoor:Door;
	public prevRoom:Room;
	public prevRoomDoor:Door;

	public addEnemies(): void {
		this.addEnemy(new BlueBall(this.engine, new Vector3(32, 16)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(32, 50)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(110, 120)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(150, 16)));
	}

	public buildLevel(): void {
		this.begar = new Begar(this.engine, "kim");
		this.begar.transform.position.x = 136;
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

		this.entrance = new Door(this.engine, Direction.LEFT);
		this.entrance.transform.position.x = 256;
		this.entrance.transform.position.y= 64;
		this.addDoor(this.entrance);

		this.exitDoor = new Door(this.engine, Direction.RIGHT);
		this.exitDoor.transform.position.x = 0;
		this.exitDoor.transform.position.y = 64;
		this.addDoor(this.exitDoor);

		let x = 128;
		let y = 128;
		let height = 4;
		this.addWall(new WallCorner(this.engine, x + 16, y, Direction.DOWN));
		this.addWall(new WallCorner(this.engine, x + 32, y, Direction.LEFT));

		this.addWall(new Wall(this.engine, x + 16, y - 16, 1, 1, Direction.RIGHT));
		this.addWall(new Wall(this.engine, x + 32, y - 32, 1, 2, Direction.LEFT));
		this.addWall(new WallCorner(this.engine, x + 16, y-32, Direction.RIGHT));
		this.addWall(new Wall(this.engine, x - 16, y-32, 2, 1, Direction.UP));
		this.addWall(new Wall(this.engine, x - 16, y-48, 3, 1, Direction.DOWN));
		this.addWall(new WallCornerOuter(this.engine, x - 32, y-32, Direction.UP));
		this.addWall(new WallCornerOuter(this.engine, x - 32, y-48, Direction.RIGHT));


		this.addWall(new WallCornerOuter(this.engine, x + 32, y-48, Direction.DOWN));
	}

	public exited(door: Door): void {
		if (door == this.exitDoor) {
			this.nextRoom.enterRoom(this.nextRoomDoor);
		}else {
			this.prevRoom.enterRoom(this.prevRoomDoor);
		}
	}
}