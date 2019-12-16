import React from "react";
import { Difficulty } from "@/utils/settings";

type MenuProps= {
	loaded:boolean,
	onCredits:Function,
	onStart:(difficulty:Difficulty)=>void
};

export const Menu:React.FC<MenuProps> = (props:MenuProps) => {
	let buttonText = "START";
	if (!props.loaded) {
		buttonText = "LOADING";
	}
	let buttons = [<p key="text">LOADING</p>] as JSX.Element[];
	if (props.loaded) {
		buttons = [
			<button key="easy" onClick={()=>props.onStart(1)}>EASY</button>,
			<button key="hard" onClick={()=>props.onStart(2)}>HARD</button>
		] as JSX.Element[];
	}
	return (
		<div className="menu screen">
			<img src="./assets/textures/logo.png" alt="icon" className="icon"/>
			<h1>Yogdungeons escape</h1>
			{buttons}
			<button onClick={()=>props.onCredits()}>CREDITS</button>
		</div>
	);
};