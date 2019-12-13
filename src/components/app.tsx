import React from "react";
import {Engine, Color, FreeCamera, OrthographicCamera, degToRadians, PerspectiveCamera, Vector2} from "scrapy-engine";


export class App extends React.Component{
	private engine:Engine;



	public render():JSX.Element {
		return (
			<div className="canvas-container">
				<canvas id="game-canvas"></canvas>
			</div>
		);
	}

	public componentDidMount():void {
		this.engine = new Engine(document.getElementById("game-canvas") as HTMLCanvasElement);
		this.engine.init();
		this.engine.setCanvasSize(new Vector2(320, 160));
		this.engine.start();
	}
}
