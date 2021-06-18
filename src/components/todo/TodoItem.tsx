import * as React from 'react';
import { sendCancelTodo, sendCompleteTodo, sendRemoveTodo } from '../../api/api';
import { Todo } from '../../api/types';
import { dateFormat } from '../../ts/timeUtils';
import { isNil } from '../../ts/utils';
import MoreActions from '../utils/moreActions/MoreActions';

type Props = {
	todo: Todo;
};

const TodoItem = (props: Props) => {
	const { todo } = props;

	let icon: string;
	if (todo.done) {
		icon = '✅';
	} else if (todo.cancelled) {
		icon = '❌';
	} else {
		icon = '🔳';
	}

	const replaceEmotes = (text: string): React.ReactNode => {
		const emoteRegex: RegExp = /<:[\w]+:[0-9]+>|<a:[\w]+:[0-9]+>/g;

		const items = text.match(emoteRegex);
		if (isNil(items)) {
			return <span className="text-gray-200 text-lg">{text}</span>;
		}

		const spans: React.ReactNode[] = [];
		let lastItemEnd: number = 0;

		for (const item of items) {
			const lastSemicolon: number = item.lastIndexOf(':');
			const emoteId: string = item.substr(lastSemicolon + 1, item.length - lastSemicolon - 2);

			const isAnimated: boolean = item[1] === 'a';

			const originalIndex: number = text.indexOf(item);
			const textSoFar: string = text.substr(lastItemEnd, originalIndex - lastItemEnd);
			lastItemEnd = originalIndex + item.length;
			spans.push(<span>{textSoFar}</span>);
			spans.push(
				<img
					className="w-6 inline"
					src={
						isAnimated
							? `https://cdn.discordapp.com/emojis/${emoteId}.gif?v=1`
							: `https://cdn.discordapp.com/emojis/${emoteId}.png?v=1`
					}
				/>,
			);
		}

		return <span className="text-gray-200 text-lg">{spans}</span>;
	};

	const completeTodo = async () => {
		await sendCompleteTodo(todo.id);
		window.location.reload();
	};

	const cancelTodo = async () => {
		await sendCancelTodo(todo.id);
		window.location.reload();
	};

	const removeTodo = async () => {
		await sendRemoveTodo(todo.id);
		window.location.reload();
	};

	return (
		<div className="p-2 mb-2 shadow-md bg-gray-800 rounded-sm flex flex-col">
			<div className="flex flex-row">
				<div className="flex-1">
					<span className="mr-2">{icon}</span>
					{replaceEmotes(todo.task)}
				</div>
				<MoreActions
					actions={[
						{
							text: 'Done',
							onClick: completeTodo,
						},
						{
							text: 'Cancel',
							onClick: cancelTodo,
						},
						{
							text: 'Remove',
							onClick: removeTodo,
						},
					]}
				/>
			</div>
			<span className="text-sm text-gray-500">{dateFormat(new Date(props.todo.addDate))}</span>
		</div>
	);
};

export default TodoItem;
