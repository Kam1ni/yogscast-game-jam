import React from "react";
import { eventBus } from "@/utils/event-bus";
import { BegarSkin } from "@/game/entities/begar";
import { SavedBegars } from "./saved-begars";
import { settings } from "@/utils/settings";

type HudProps = {
	onGameOver:Function;
	onBack:Function;
};

export class Hud extends React.Component<HudProps> {
	public state:{health:number, maxHealth:number, score:number, endText:string, savedBegars:BegarSkin[]};

	public constructor(props:HudProps) {
		super(props);

		this.state = {
			health:5,
			maxHealth:0,
			score:0,
			endText:"",
			savedBegars:[]
		};
	}

	public onBack():void {
		this.setState({...this.state, endText:"", score:0, savedBegars:[], health:5});
		this.props.onBack();
	}

	public render():JSX.Element {
		let hearts = [] as JSX.Element[];
		for (let i = 0; i < this.state.health; i++) {
			hearts.push(<img className="heart" src="./assets/textures/heart.png" key={i}/>);
		}

		if (this.state.endText != "") {
			return <div className="screen game-over">
				<h1>{this.state.endText}</h1>
				<SavedBegars savedBegars={this.state.savedBegars}/>
				<h2 className="score">SCORE: {this.state.score}</h2>
				<button onClick={()=>this.onBack()}>Main Menu</button>
			</div>;
		}

		return (
			<div className="hud">
				<div className="health">
					{hearts}
				</div>
				<div className="spacer"></div>
				<h1 className="score">Score: {this.state.score}</h1>
			</div>
		);
	}

	public componentDidMount():void {
		eventBus.on("health", (health:number)=> {
			this.setState({ ...this.state, health});
		});

		eventBus.on("max-health", (maxHealth:number)=> {
			this.setState({...this.state, maxHealth});
		});

		eventBus.on("score", (toAddScore:number)=> {
			console.log(toAddScore, settings.difficulty);
			this.setState({...this.state, score:this.state.score + (toAddScore * settings.difficulty)});
		});

		eventBus.on("game-over", ()=> {
			if (this.state.savedBegars.length == 6) {
				this.setState({...this.state, endText:"You saved everyone. But at what cost?"});
			}else {
				this.setState({...this.state, endText:"Game Over"});
			}
			this.props.onGameOver();
		});

		eventBus.on("victory", ()=> {
			if (this.state.savedBegars.length == 0) {
				this.setState({...this.state, endText:"Why haven't you saved anyone?"});
			}else if (this.state.savedBegars.length != 6) {
				this.setState({...this.state, endText:"You missed a few. But these will have to do."});
			}else {
				this.setState({...this.state, endText:"Victory"});
			}
			this.props.onGameOver();
		});

		eventBus.on("begar-saved", (skin:BegarSkin) => {
			this.setState({...this.state, savedBegars:[...this.state.savedBegars, skin]});
		});
	}
}