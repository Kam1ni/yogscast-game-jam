import React from "react";

type CreditProps = {
	exit:Function
}

export const Credits:React.FC<CreditProps> = (props:CreditProps) => {

	return (
		<div className="credits screen">
			<p>TODO</p>
			<button onClick={e=>props.exit()}>BACK</button>
		</div>
	);
};