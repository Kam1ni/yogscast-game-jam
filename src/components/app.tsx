import React from "react";
import {Engine, Color, FreeCamera, OrthographicCamera, degToRadians, PerspectiveCamera, Vector2} from "scrapy-engine";
import { TestWorld } from "@/game/world/test-world";
import {Hud} from "./Hud";
import { MainWorld } from "@/game/world/game-world";


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
		this.engine.setCanvasSize(new Vector2((256 + 32) * 4, (128 + 32) * 4));
		this.engine.renderBoundingBoxes = true;
		new TestWorld(this.engine);
		this.engine.setWorld(new MainWorld(this.engine));
		this.engine.getCamera().transform.scale.x = 4;
		this.engine.getCamera().transform.scale.y = 4;
		this.engine.getCamera().transform.scale.z = 4;
		this.engine.start();
	}
}
