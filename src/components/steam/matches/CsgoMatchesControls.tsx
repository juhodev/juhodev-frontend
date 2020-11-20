import * as React from 'react';

type Props = {
	changePage: (by: number) => void;
	currentPage: number;
};

const CsgoMatchesControls = (props: Props) => {
	return (
		<div className="flex flex-row justify-center items-center">
			<button
				className="text-4xl text-gray-100 cursor-pointer"
				onClick={() => props.changePage(-1)}
			>
				{'<'}
			</button>
			<span className="text-xl text-gray-100 mx-6">{`Page ${props.currentPage}`}</span>
			<button
				className="text-4xl text-gray-100 cursor-pointer"
				onClick={() => props.changePage(1)}
			>
				{'>'}
			</button>
		</div>
	);
};

export default CsgoMatchesControls;
