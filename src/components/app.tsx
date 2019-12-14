import React from "react";
import {Engine, Color, FreeCamera, OrthographicCamera, degToRadians, PerspectiveCamera, Vector2} from "scrapy-engine";
import { TestWorld } from "@/game/world/test-world";
import {Hud} from "./Hud";


export class App extends React.Component{
	private engine:Engine;

	public render():JSX.Element {
		return (
			<div className="canvas-container">
				<Hud/>
				<canvas id="game-canvas"></canvas>
			</div>
		);
	}

	public componentDidMount():void {
		this.engine = new Engine(document.getElementById("game-canvas") as HTMLCanvasElement);
		this.engine.init();
		this.engine.setWorld(new TestWorld(this.engine));
		this.engine.renderBoundingBoxes = true;
		this.engine.start();
	}
}
