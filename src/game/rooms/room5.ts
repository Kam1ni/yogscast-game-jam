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

export class Room5 extends Room{
	public begar:Begar;
	public entrance:Door;
	public exitDoor:Door;
	public nextRoom:Room;
	public nextRoomDoor:Door;
	public prevRoom:Room;
	public prevRoomDoor:Door;

	public addEnemies(): void {
		this.addEnemy(new BlueBall(this.engine, new Vector3(128, 16)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(128, 50)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(80, 50)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(80, 16)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(32, 16)));
	}

	public buildLevel(): void {
		this.begar = new Begar(this.engine, "sips");
		this.begar.transform.position.x = 24;
		this.begar.transform.position.y = 8;
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

		this.exitDoor = new Door(this.engine, Direction.DOWN);
		this.exitDoor.transform.position.x = 128;
		this.exitDoor.transform.position.y = 128;
		this.addDoor(this.exitDoor);

		let x = 128 - 96;
		let y = 0;
		let height = 4;
		this.addWall(new WallCorner(this.engine, x + 16, y - 16, Direction.RIGHT));
		this.addWall(new WallCorner(this.engine, x + 32, y - 16, Direction.UP));
		
		this.addWall(new Wall(this.engine, x + 16, y, 1, height, Direction.RIGHT));
		this.addWall(new Wall(this.engine, x + 32, y, 1, height, Direction.LEFT));
		
		this.addWall(new WallCornerOuter(this.engine, x + 16, y + 16 * height, Direction.UP));
		this.addWall(new WallCornerOuter(this.engine, x + 32, y + 16 * height, Direction.LEFT));

		x = 128 + 32;
		y = 0;
		height = 4;
		this.addWall(new WallCorner(this.engine, x + 16, y - 16, Direction.RIGHT));
		this.addWall(new WallCorner(this.engine, x + 32, y - 16, Direction.UP));
		
		this.addWall(new Wall(this.engine, x + 16, y, 1, height, Direction.RIGHT));
		this.addWall(new Wall(this.engine, x + 32, y, 1, height, Direction.LEFT));
		
		this.addWall(new WallCornerOuter(this.engine, x + 16, y + 16 * height, Direction.UP));
		this.addWall(new WallCornerOuter(this.engine, x + 32, y + 16 * height, Direction.LEFT));
	}

	public exited(door: Door): void {
		if (door == this.exitDoor) {
			this.nextRoom.enterRoom(this.nextRoomDoor);
		}else {
			this.prevRoom.enterRoom(this.prevRoomDoor);
		}
	}
}