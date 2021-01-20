import * as React from 'react';

const { useState, useEffect } = React;

type Props = {
	map: string;
};

const MapImage = (props: Props) => {
	const [img, setImg] = useState<string>(undefined);

	const lazyLoadImage = async (map: string) => {
		let file: string;

		switch (map) {
			case 'train':
			case 'vertigo':
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
			// `../../../../assets/${file}`
			`../../../../assets/${file}`
		);
		return asset.default;
	};

	const updateResource = async () => {
		const resource = await lazyLoadImage(props.map.toLowerCase());
		setImg(resource);
	};

	useEffect(() => {
		updateResource();
	}, []);

	return (
		<div className="w-32 h-16 overflow-hidden rounded items-center justify-center">
			<img className="w-full" src={img} />
		</div>
	);
};

export default MapImage;
