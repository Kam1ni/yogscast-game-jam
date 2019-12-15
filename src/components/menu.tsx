import React from "react";

type MenuProps= {
	loaded:boolean,
	onCredits:Function,
	onStart:Function
};

export const Menu:React.FC<MenuProps> = (props:MenuProps) => {

	return (
		<div className="menu screen">
			<img src="./assets/textures/logo.png" alt="icon" className="icon"/>
			<h1>Yogdungeons escape</h1>
			<button disabled={!props.loaded} onClick={()=>props.onStart()}>PLAY</button>
			<button onClick={()=>props.onCredits()}>CREDITS</button>
		</div>
	);
};