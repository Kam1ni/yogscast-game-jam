import React from "react";

type CreditProps = {
	exit:Function
};

export const Credits:React.FC<CreditProps> = (props:CreditProps) => {

	return (
		<div className="credits screen">
			<div className="content">
				<h1>Yogdungeon escape</h1>
				<div className="credit">
					<div className="what">Lead developer</div>
					<div className="who">Kamil Kulach</div>
				</div>
				<div className="credit">
					<div className="what">Sprite design</div>
					<div className="who">Kamil Kulach</div>
				</div>
				<div className="credit">
					<div className="what">Sound efects</div>
					<div className="who">Kamil Kulach</div>
				</div>
				<div className="credit">
					<div className="what">Animation supervisor</div>
					<div className="who">Kamil Kulach</div>
				</div>
				<div className="credit">
					<div className="what">Game engine used</div>
					<div className="who">Scrapy-engine (download now from npm or fork on github :p)</div>
				</div>
				<div className="credit">
					<div className="what">Game engine developer</div>
					<div className="who">Kamil Kulach</div>
				</div>
				<div className="credit">
					<div className="what">The guy that made the entire game on his own</div>
					<div className="who">Kamil Kulach</div>
				</div>
				<div className="credit">
					<div className="what">Why did he make a game</div>
					<div className="who">Yogscast game jam 2019</div>
					<div className="who">(and to test his game-engine)</div>
				</div>
				<div className="credit">
					<div className="what">Did you know Kamil Kulach's birthday is on the same day as when the game jam ended</div>
					<div className="who">No</div>
				</div>
				<div className="credit">
					<div className="what">Should someone else be credited</div>
					<div className="who">Yes</div>
				</div>
				<div className="credit">
					<div className="what">Who?</div>
					<div className="who">The yogscast of course.</div>
					<div className="who">For being so kind to let themselves get trapped inside this dungeon.</div>
				</div>
			</div>

			<button onClick={e=>props.exit()}>BACK</button>
		</div>
	);
};