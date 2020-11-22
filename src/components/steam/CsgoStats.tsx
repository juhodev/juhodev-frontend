import * as React from 'react';

type Props = {
	name: string;
	average: string;
	highest?: string;
	matchId?: number;
	standardDeviation?: number;
	standardError?: number;
};

const CsgoStats = (props: Props) => {
	let textClassName: string;
	if (props.highest !== undefined) {
		textClassName = 'flex items-baseline';
	} else {
		textClassName = 'flex items-baseline justify-center w-full';
	}

	let containerClassName: string;
	if (props.highest !== undefined) {
		containerClassName = 'flex flex-col mr-16';
	} else {
		containerClassName = 'flex flex-col mr-4';
	}

	return (
		<div className={containerClassName}>
			<span className="text-2xl text-gray-500">{props.name}</span>
			<div className={textClassName}>
				<span className="font-bold text-4xl text-gray-100 leading-0">
					{props.standardDeviation !== undefined ? (
						<abbr
							title={`SD: ${props.standardDeviation.toFixed(
								3,
							)}, SE: ${props.standardError.toFixed(3)}`}
						>
							{props.average}
						</abbr>
					) : (
						`${props.average}`
					)}
				</span>
				{props.highest !== undefined && (
					<span className="ml-1 text-lg text-gray-500 leading-0">
						{props.matchId !== undefined ? (
							<a
								href={`${window.location.origin}/match?id=${props.matchId}`}
							>
								{`(${props.highest})`}
							</a>
						) : (
							`(${props.highest})`
						)}
					</span>
				)}
			</div>
		</div>
	);
};

export default CsgoStats;
