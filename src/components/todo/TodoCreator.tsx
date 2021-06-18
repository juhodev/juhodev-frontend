import * as React from 'react';
import { sendTodoTask } from '../../api/api';
import TextInput from '../utils/TextInput';

const { useState } = React;

const TodoCreator = () => {
	const [task, setTask] = useState<string>('');

	const sendTask = async () => {
		await sendTodoTask(task);
		window.location.reload();
	};

	return (
		<div className="bg-gray-800 rounded p-2 flex flex-row shadow my-2">
			<div className="w-5/6 flex-shrink-0">
				<TextInput onChange={(value) => setTask(value)} title="Create todo item" value={task} />
			</div>
			<div className="flex items-center justify-center w-full">
				<button className="bg-blue-500 px-6 py-1 rounded text-gray-200 h-8" onClick={sendTask}>
					Create
				</button>
			</div>
		</div>
	);
};

export default TodoCreator;
