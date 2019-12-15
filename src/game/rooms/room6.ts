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
import { eventBus } from "@/utils/event-bus";

export class Room6 extends Room{
	public begar:Begar;
	public entrance:Door;
	public exitDoor:Door;
	public prevRoom:Room;
	public prevRoomDoor:Door;

	public addEnemies(): void {
		this.addEnemy(new BlueBall(this.engine, new Vector3(32, 16)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(32, 100)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(200, 50)));
		this.addEnemy(new BlueBall(this.engine, new Vector3(200, 100)));
	}

	public buildLevel(): void {
		this.begar = new Begar(this.engine, "sjin");
		this.begar.transform.position.x = 248;
		this.begar.transform.position.y = 88;
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

		this.entrance = new Door(this.engine, Direction.UP);
		this.entrance.transform.position.x = 128;
		this.entrance.transform.position.y= 0;
		this.addDoor(this.entrance);

		this.exitDoor = new Door(this.engine, Direction.RIGHT);
		this.exitDoor.transform.position.x = 0;
		this.exitDoor.transform.position.y = 64;
		this.addDoor(this.exitDoor);

		let x = 256-64;
		let y = 96;
		this.addWall(new Wall(this.engine, x - 16, y-32, 5, 1, Direction.UP));
		this.addWall(new Wall(this.engine, x - 16, y-48, 5, 1, Direction.DOWN));
		this.addWall(new WallCornerOuter(this.engine, x - 32, y-32, Direction.UP));
		this.addWall(new WallCornerOuter(this.engine, x - 32, y-48, Direction.RIGHT));
		this.addWall(new WallCorner(this.engine, 256, 64, Direction.RIGHT));
		this.addWall(new WallCorner(this.engine, 256, 48, Direction.DOWN));

		x = 128 - 96;
		y = 0;
		let height = 4;
		this.addWall(new WallCorner(this.engine, x + 16, y - 16, Direction.RIGHT));
		this.addWall(new WallCorner(this.engine, x + 32, y - 16, Direction.UP));
		
		this.addWall(new Wall(this.engine, x + 16, y, 1, height, Direction.RIGHT));
		this.addWall(new Wall(this.engine, x + 32, y, 1, height, Direction.LEFT));
		
		this.addWall(new WallCornerOuter(this.engine, x + 16, y + 16 * height, Direction.UP));
		this.addWall(new WallCornerOuter(this.engine, x + 32, y + 16 * height, Direction.LEFT));

	}

	public exited(door: Door): void {
		if (door == this.exitDoor) {
			eventBus.emit("victory");
		}else {
			this.prevRoom.enterRoom(this.prevRoomDoor);
		}
	}
}