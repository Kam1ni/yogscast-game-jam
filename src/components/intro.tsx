import React from "react";

type IntroProps = {
	onNext:Function
};

export const Intro:React.FC<IntroProps> = (props:IntroProps) => {

	return (
		<div className="intro screen">
			<p>Some members of the yogscast got trapped inside a dungeon. You have to save them</p>
			<p>They are all equiped with teleporters powered by their life force (Thanks YogLabs) but their life force is low.</p>
			<p>Get in there and give them some of your life force so they can escape.</p>
			<p>Use WASD to move. SPACE to shoot fireballs/interact with objects.</p>
			<button onClick={e=>props.onNext()}>START</button>
		</div>
	);
};