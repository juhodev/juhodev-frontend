import * as React from 'react';
import { ProgressBarData } from '../../api/types';
import EditField from '../utils/EditField';
import Button from '../utils/Button';
import ToggleButton from '../utils/ToggleButton';
import { editProgressBar } from '../../api/api';

const { useState, useEffect } = React;

type Props = {
	data: ProgressBarData;
	onExit: () => void;
};

const ProgressBarEdit = (props: Props) => {
	const [name, setName] = useState<string>(props.data.name);
	const [value, setValue] = useState<string>(props.data.value.toString());
	const [max, setMax] = useState<string>(props.data.max.toString());
	const [displayNumber, setDisplayNumber] = useState<boolean>(props.data.displayNumber ?? false);
	const [displayPercentage, setDisplayPercentage] = useState<boolean>(props.data.displayPercentage ?? false);

	const saveProgressBar = async () => {
		const edited: ProgressBarData = {
			uuid: props.data.uuid,
			snowflake: props.data.snowflake,
			value: parseInt(value),
			max: parseInt(max),
			name,
			displayNumber,
			displayPercentage,
		};

		await editProgressBar(props.data, edited);
		props.onExit();
	};

	return (
		<div className="absolute p-0 m-0 x-0 y-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
			<div className="relative bg-gray-200 opacity-100 w-102 bg-gray-900 rounded p-4 flex items-center flex-col shadow-md">
				<div className="w-96">
					<span className="text-blue-500 text-3xl mb-2">Progress bar edit</span>
					<div className="mb-2">
						<EditField title="Progress bar name" value={name} onChange={e => setName(e)} />
					</div>
					<div className="mb-2">
						<EditField title="Progress bar value" value={value} onChange={e => setValue(e)} />
					</div>
					<div className="mb-2">
						<EditField title="Progress bar max" value={max} onChange={e => setMax(e)} />
					</div>
					<div className="mb-2 w-full">
						<ToggleButton title="Display numbers in progress bar" checked={displayNumber} onChange={(checked) => setDisplayNumber(checked)} />
					</div>
					<div className="mb-4 w-full">
						<ToggleButton title="Display percentages in progress bar" checked={displayPercentage} onChange={(checked) => setDisplayPercentage(checked)} />
					</div>
					<div className="w-full flex flex-row justify-around">
						<Button text="Save" onClick={() => saveProgressBar()} />
						<Button text="Cancel" onClick={props.onExit} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProgressBarEdit;