import * as React from 'react';
import { MatchWithPlayerStats } from '../../../api/types';
import { dateFormat } from '../../../ts/timeUtils';

type Props = {
	match: MatchWithPlayerStats;
};

const CsgoMatchPreview = (props: Props) => {
	const { match } = props;

	const winner: string = match.ctRounds > match.tRounds ? 'CT' : 'T';
	const tie: boolean = match.ctRounds === match.tRounds;

	const renderWinOrLoss = () => {
		if (tie) {
			return <span className="text-gray-500 font-bold mx-4">TIE</span>;
		}

		if (winner === match.player.side) {
			return <span className="text-green-500 font-bold mx-4">WIN</span>;
		}

		return <span className="text-red-500 font-bold mx-4">LOSS</span>;
	};

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
				<span className="text-gray-500 sm:text-sm">{dateFormat(new Date(match.date))}</span>
				{renderWinOrLoss()}
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
		</a>
	);
};

export default CsgoMatchPreview;
