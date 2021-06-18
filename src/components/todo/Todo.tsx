import * as React from 'react';
import { fetchTodoItems } from '../../api/api';
import { Todo, TodoResponse } from '../../api/types';
import { LOGIN_PAGE } from '../../ts/constants';
import { redirectFrom } from '../../ts/utils';
import TodoCreator from './TodoCreator';
import TodoItem from './TodoItem';

const { useState, useEffect } = React;

const TodoPage = () => {
	const [todoItems, setTodoItems] = useState<Todo[]>([]);

	const jwt = localStorage.getItem('jwt');
	if (jwt === null) {
		redirectFrom(LOGIN_PAGE, 'todo');
		return;
	}

	useEffect(() => {
		loadItems();
	}, []);

	const loadItems = async () => {
		const items: TodoResponse = await fetchTodoItems();

		if (items.error) {
			return;
		}

		setTodoItems(items.todos);
	};

	const doneItems: React.ReactNode[] = todoItems
		.filter((x) => x.done)
		.map((item, i) => {
			return <TodoItem todo={item} key={i} />;
		});
	const cancelledItems: React.ReactNode[] = todoItems
		.filter((x) => x.cancelled)
		.map((item, i) => {
			return <TodoItem todo={item} key={i} />;
		});
	const otherItems: React.ReactNode[] = todoItems
		.filter((x) => !x.done && !x.cancelled)
		.map((item, i) => {
			return <TodoItem todo={item} key={i} />;
		});

	return (
		<div className="flex flex-col items-center">
			<div className="w-5/6">
				<TodoCreator />
				<div className="mb-4">{otherItems}</div>
				<div className="mb-4">{doneItems}</div>
				<div className="">{cancelledItems}</div>
			</div>
		</div>
	);
};

export default TodoPage;
