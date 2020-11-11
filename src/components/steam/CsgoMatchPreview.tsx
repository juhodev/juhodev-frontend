import * as React from 'react';
import { GameWithStats } from '../../api/types';

type Props = {
	match: GameWithStats;
};

const CsgoMatchPreview = (props: Props) => {
	const { match } = props;

	return (
		<a
			className="flex flex-row w-full items-center m-1 p-2 border-2 border-gray-800 text-gray-100 text-lg"
			href={`${window.location.origin}/match?id=${match.id}`}
		>
			<span className="mr-2">{match.map}</span>
			<span className="text-gray-500 mr-2 flex-1">
				{match.ctRounds} - {match.tRounds}
			</span>
			<span>{`${match.player.kills} kills - ${match.player.assists} assists - ${match.player.deaths} deaths - ${match.player.score} score`}</span>
		</a>
	);
};

export default CsgoMatchPreview;
