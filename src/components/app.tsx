import React from "react";
import {Engine, Color, FreeCamera, OrthographicCamera, degToRadians, PerspectiveCamera, Vector2} from "scrapy-engine";
import {Hud} from "./hud";
import { MainWorld } from "@/game/world/game-world";
import { Menu } from "./menu";
import { Credits } from "./credits";
import { Intro } from "./intro";
import { eventBus } from "@/utils/event-bus";

type Screen = "menu" | "game" | "credits" | "intro";

export class App extends React.Component{
	private engine:Engine;
	private mainWorld:MainWorld;
	public state:{
		loaded:boolean,
		screen:Screen,
	};

	public constructor(props:any) {
		super(props);
		this.state = {
			loaded:false,
			screen:"menu"
		};
	}

	public render():JSX.Element {
		let extraItems = [] as JSX.Element[];
		if (this.state.screen == "menu") {
			extraItems.push(<Menu key="menu" loaded={this.state.loaded} onCredits={()=>this.setScreen("credits")} onStart={()=>this.setScreen("intro")}/>);
		}
		if (this.state.screen == "credits") {
			extraItems.push(<Credits exit={()=>this.setScreen("menu")} key="credits"/>);
		}

		if (this.state.screen == "intro") {
			extraItems.push(<Intro key="intro" onNext={()=>this.setScreen("game")} />);
		}

		return (
			<div className="canvas-container">
				{extraItems}
				<Hud onGameOver={()=>this.mainWorld.stop()} onBack={()=>this.setScreen("menu")}/>
				<canvas id="game-canvas"></canvas>
			</div>
		);
	}

	public setScreen(screen:Screen):void {
		this.setState({...this.state, screen});
		if (screen == "game") {
			this.mainWorld.start();
		}
	}

	public componentDidMount():void {
		this.engine = new Engine(document.getElementById("game-canvas") as HTMLCanvasElement);
		this.engine.init();
		this.engine.setCanvasSize(new Vector2((256 + 32) * 4, (128 + 32) * 4));
		//this.engine.renderBoundingBoxes = true;
		this.mainWorld = new MainWorld(this.engine);
		this.mainWorld.prefetchAssets().then(()=> {
			this.setState({...this.state, loaded:true});
		});
		this.engine.setWorld(this.mainWorld);
		this.engine.getCamera().transform.scale.x = 4;
		this.engine.getCamera().transform.scale.y = 4;
		this.engine.getCamera().transform.scale.z = 4;
		this.engine.start();
	}
}
