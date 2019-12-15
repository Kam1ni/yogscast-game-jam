import React from "react";

type MenuProps= {
	loaded:boolean,
	onCredits:Function,
	onStart:Function
};

export const Menu:React.FC<MenuProps> = (props:MenuProps) => {

	return (
		<div className="menu screen">
			<button disabled={!props.loaded} onClick={()=>props.onStart()}>PLAY</button>
			<button onClick={()=>props.onCredits()}>CREDITS</button>
		</div>
	);
};