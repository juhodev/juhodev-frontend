import * as React from 'react';
import { formatSeconds } from '../../ts/timeUtils';
import CsgoStats from './CsgoStats';

const { useState, useEffect } = React;

type Props = {
	map: string;
	timesPlayed: number;
	waitTime?: number;
	matchDuration?: number;
	compact?: boolean;
};

const lazyLoadImage = async (map: string) => {
	let file: string;

	switch (map) {
		case 'train':
		case 'overpass':
		case 'breach':
		case 'cache':
			file = `${map}.png`;
			break;

		case 'nuke':
		case 'inferno':
		case 'dust ii':
		case 'cobblestone':
		case 'canals':
		case 'mirage':
			file = `${map}.jpg`;
			break;

		default:
			file = `not_found.jpg`;
			break;
	}

	const asset = await import(
		/* webpackMode: "lazy-once" */
		`../../../assets/${file}`
	);
	return asset.default;
};

const MapStats = (props: Props) => {
	const [img, setImg] = useState<string>('');

	useEffect(() => {
		updateResource();
	}, []);

	const updateResource = async () => {
		const resource = await lazyLoadImage(props.map.toLowerCase());
		setImg(resource);
	};

	let containerClassName: string;
	if (props.compact) {
		containerClassName =
			'w-full h-28 overflow-hidden relative rounded flex items-center';
	} else {
		containerClassName =
			'w-full h-36 overflow-hidden relative rounded flex items-center';
	}

	return (
		<div className="flex flex-col">
			<div className={containerClassName}>
				<img className="absolute" src={img} />
				<div className="absolute w-full h-full p-2 bg-black bg-opacity-75">
					<span className="text-gray-100 text-2xl font-bold">
						{props.map}
					</span>
					<span className="ml-2 text-gray-100 text-2xl">{`${props.timesPlayed} matches`}</span>
					{props.matchDuration !== undefined && (
						<div className="flex w-full h-full">
							<div className="flex flex-row items-center justify-center w-full">
								<div className="flex flex-col mx-2">
									<span className="text-blue-500 text-xl font-bold">
										Wait time
									</span>
									<span className="text-gray-100 text-center">
										{formatSeconds(props.waitTime)}
									</span>
								</div>
								<div className="flex flex-col mx-2">
									<span className="text-blue-500 text-xl font-bold">
										Match duration
									</span>
									<span className="text-gray-100 text-center">
										{formatSeconds(props.matchDuration)}
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="flex justify-center"></div>
			</div>
		</div>
	);
};

export default MapStats;
