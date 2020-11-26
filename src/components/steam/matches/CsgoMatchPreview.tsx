import * as React from 'react';
import { GameWithStats } from '../../../api/types';
import { dateFormat } from '../../../ts/timeUtils';

type Props = {
	match: GameWithStats;
};

const CsgoMatchPreview = (props: Props) => {
	const { match } = props;

	return (
		<a
			className="flex sm:flex-row flex-col w-full m-1 sm:p-2 border-b-2 border-gray-800 text-gray-100 text-lg"
			href={`${window.location.origin}/match?id=${match.id}`}
		>
			<div className="flex flex-row sm:flex-1 items-center">
				<span className="mr-2">{match.map}</span>
				<span className="text-gray-500 mr-2">
					{match.ctRounds} - {match.tRounds}
				</span>
				<span className="text-gray-500 sm:text-sm">
					{dateFormat(new Date(match.date))}
				</span>
			</div>
			<div className="flex flex-row">
				<span>{match.player.kills} kills</span>
				<span className="text-gray-500 mx-1">-</span>
				<span>{match.player.assists} assists</span>
				<span className="text-gray-500 mx-1">-</span>
				<span>{match.player.deaths} deaths</span>
				<span className="text-gray-500 mx-1">-</span>
				<span>{match.player.score} score</span>
			</div>
			{/* <span>{`${match.player.kills} kills - ${match.player.assists} assists - ${match.player.deaths} deaths - ${match.player.score} score`}</span> */}
		</a>
	);
};

export default CsgoMatchPreview;
