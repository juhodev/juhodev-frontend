import * as React from 'react';
import { editProgressBar } from '../../api/api';
import { ProgressBarData } from '../../api/types';

const { useState, useEffect } = React;

const ANIMATION_POINTS: number = 250;

type Props = {
	size: 'xl' | 'lg' | 'md' | 'sm';
	uuid: string;
	snowflake: string;
	value: number;
	max: number;
	title: string;
	displayNumber: boolean;
	displayPercentage: boolean;
	onEdit: () => void;
	animationSpeed?: number;
};

const ProgressBar = (props: Props) => {
	const [fill, setFill] = useState<number>(0);
	const [data, setData] = useState<ProgressBarData>({
		uuid: props.uuid,
		snowflake: props.snowflake,
		max: props.max,
		value: props.value,
		name: props.title,
		displayNumber: props.displayNumber,
		displayPercentage: props.displayPercentage,
	});

	useEffect(() => {
		const percentageDone: number = props.value / props.max * 100;
		const addPerOneMovement: number = percentageDone / ANIMATION_POINTS;

		let currentFill: number = 0;
		const updateInterval = setInterval(() => {
			if (currentFill >= percentageDone) {
				clearInterval(updateInterval);
				return;
			}

			currentFill += addPerOneMovement;
			setFill(currentFill);
		}, props.animationSpeed || 5);
	}, [props.value, props.max, props.title, props.displayNumber, props.displayPercentage]);

	const updateCounter = async (by: number) => {
		const newData: ProgressBarData = {
			uuid: data.uuid,
			snowflake: data.snowflake,
			value: data.value - 1,
			max: data.max,
			name: data.name,
			displayNumber: data.displayNumber,
			displayPercentage: data.displayPercentage,
		};

		const originalData: ProgressBarData = {
			uuid: data.uuid,
			snowflake: data.snowflake,
			value: data.value,
			max: data.max,
			name: data.name,
			displayNumber: data.displayNumber,
			displayPercentage: data.displayPercentage,
		};

		setData(newData);
		await editProgressBar(originalData, newData);
	};

	let className: string;
	switch (props.size) {
		case 'xl':
			className = 'w-102';
			break;

		case 'lg':
			className = 'w-80';
			break;

		case 'md':
			className = 'w-60';
			break;

		case 'sm':
			className = 'w-24';
			break;
	}

	className += ' h-12 flex flex-row';

	let doneText: string;
	let togoText: string;

	if (props.displayNumber && props.displayPercentage) {
		const percentageDone: number = Math.round(data.value / data.max * 100);
		doneText = `${data.value} (${percentageDone}%)`
		togoText = `${data.max - data.value} (${100 - percentageDone}%)`;
	} else {
		if (props.displayNumber || !props.displayPercentage) {
			doneText = data.value.toString();
			togoText = (data.max - data.value).toString();
		}

		if (props.displayPercentage) {
			doneText = Math.round(data.value / data.max * 100).toString() + '%';
			togoText = (100 - Math.round(data.value / data.max * 100)).toString() + '%';
		}
	}

	return (
		<div className="flex flex-col m-2">
			<div>
				<span className="text-blue-300 text-xl">{props.title}</span>
				<span className="text-gray-200 text-lg opacity-0 hover:opacity-100 cursor-pointer ml-2" onClick={props.onEdit}>Edit</span>
			</div>
			<div className={className}>
				<div style={{ width: `${Math.max(3, fill)}%` }} className="bg-gradient-to-r from-blue-400 to-blue-600 text-center align-middle rounded-l-md flex flex-col">
					{`${doneText}`}
					<span className="opacity-0 hover:opacity-100 bolder cursor-pointer text-xl" onClick={() => updateCounter(1)}>-</span>
				</div>
				<div style={{ width: `${100 - fill}%` }} className="bg-red-500 text-center align-middle rounded-r-md flex flex-col">
					{`${togoText}`}
					<span className="opacity-0 hover:opacity-100 bolder cursor-pointer w-full text-xl" onClick={() => updateCounter(1)}>+</span>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
