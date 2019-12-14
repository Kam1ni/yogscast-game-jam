import { Room } from "../entities/room";
import { Door } from "../entities/door";

export class Room1 extends Room {
	public exited(door:Door): void {
		throw new Error("Method not implemented.");
	}
	public addEnemies(): void {
		throw new Error("Method not implemented.");
	}
	public buildLevel(): void {
		throw new Error("Method not implemented.");
	}
}