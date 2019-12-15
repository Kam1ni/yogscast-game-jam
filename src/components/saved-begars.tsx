import React from "react";
import { BegarSkin } from "@/game/entities/begar";

type SavedBegarsProps = {
	savedBegars:BegarSkin[]
};

export const SavedBegars:React.FC<SavedBegarsProps> = (props:SavedBegarsProps) => {
	let begars = [] as JSX.Element[];
	for (let begar of props.savedBegars) {
		let src = `./assets/textures/${begar}.png`;
		begars.push(<img className="begar" src={src} key={begar}/>);
	}

	return (
		<div className="saved-begars">
			{begars}
		</div>
	);
};