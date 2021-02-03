import * as React from 'react';
import { HeatmapPosition, Position } from '../../../../api/types';
import * as heatmap from 'heatmap.js';

const { useRef, useEffect, useState } = React;

type Props = {
	positions: HeatmapPosition[];
	map: string;
};

const Heatmap = (props: Props) => {
	const [img, setImg] = useState<string>(undefined);
	const [savedHeatmapInstance, setSavedHeatmapInstance] = useState<any>(undefined);
	const containerRef = useRef(null);

	const lazyLoadImage = async (map: string) => {
		let file: string;

		switch (map.toLowerCase()) {
			case 'train':
			case 'overpass':
			case 'breach':
			case 'cache':
			case 'nuke':
			case 'inferno':
			case 'dust ii':
			case 'cobblestone':
			case 'canals':
			case 'mirage':
				file = `de_${map}_radar.png`;
				break;

			default:
				file = `not_found.jpg`;
				break;
		}

		const asset = await import(
			/* webpackMode: "lazy-once" */
			`../../../../../assets/${file}`
		);
		return asset.default;
	};

	useEffect(() => {
		updateResource();

		let heatmapInstance;
		if (savedHeatmapInstance === undefined) {
			heatmapInstance = heatmap.create({
				container: containerRef.current,
			});
			setSavedHeatmapInstance(heatmapInstance);
		} else {
			heatmapInstance = savedHeatmapInstance;
		}

		const values = props.positions.map((p) => p.value);
		const data: heatmap.HeatmapData<Record<'value' | 'x' | 'y', number>> = {
			max: Math.max(0, ...values),
			min: 0,
			data: props.positions,
		};

		heatmapInstance.setData(data);
	}, [containerRef, props.positions]);

	const updateResource = async () => {
		const resource = await lazyLoadImage(props.map.toLowerCase());
		setImg(resource);
	};

	return (
		<div className="flex justify-center">
			<div ref={containerRef}>
				<img className="rounded" src={img} width={1024} height={1024}></img>
			</div>
		</div>
	);
};

export default Heatmap;
