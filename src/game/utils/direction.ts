export enum Direction{
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

export function invertDirection(direction:Direction):Direction {
	if (direction == Direction.UP) {
		return Direction.DOWN;
	}
	if (direction == Direction.LEFT) {
		return Direction.RIGHT;
	}
	if (direction == Direction.RIGHT) {
		return Direction.LEFT;
	}
	return Direction.UP;
}