import React from "react";
import { eventBus } from "@/utils/event-bus";

export class Hud extends React.Component {
	public state:{health:number, maxHealth:number, score:number};

	public constructor(props:any) {
		super(props);

		this.state = {
			health:0,
			maxHealth:0,
			score:0
		};
	}

	public render():JSX.Element {
		return (
			<div className="hud">
				<h1 className="health">{this.state.health}/{this.state.maxHealth}</h1>
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
			this.setState({...this.state, score:this.state.score + toAddScore});
		});
	}
}