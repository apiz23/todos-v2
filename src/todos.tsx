import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { apiUrl } from "./utils/utilities";
import axios from "axios";
import icon from "./assets/icon.svg";

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export const Todos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const fetchData = async () => {
		try {
			const response = await axios.get<Todo[]>(apiUrl);
			setTodos(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleComplete = async (id: number) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		try {
			await axios.put(`${apiUrl}/${id}`, {
				completed: !todos.find((todo) => todo.id === id)?.completed,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`${apiUrl}/${id}`);
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
			<h1 className="text-red-500 flex font-semibold text-2xl">
				Todos <img src={icon} alt="icon" className="ms-5 h-8 w-8" />
			</h1>

			<div className="mx-auto flex justify-end">
				<button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
					<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						Add
					</span>
				</button>
			</div>

			<div className="w-full h-96 overflow-y-auto">
				{todos.map((todo) => (
					<div
						key={todo.id}
						className={`todos ${
							!todo?.completed && "bg-red-100 border-red-600"
						} bg-green-200 border-green-500 px-2 py-3 border shadow-md rounded-md grid grid-cols-3 mb-3`}
					>
						<div className="title max-w-fit col-span-2 px-2">
							<p className="text-normal">{todo.title}</p>
						</div>
						<div className="buttons grid grid-cols-1 md:grid-cols-3 gap-1">
							<button
								type="button"
								className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mb-2"
								onClick={() => {
									handleComplete(todo.id);
								}}
							>
								<FaCheck />
							</button>

							<button
								type="button"
								className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mb-2"
							>
								<MdEdit />
							</button>
							<button
								type="button"
								className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mb-2"
								onClick={() => {
									handleDelete(todo.id);
								}}
							>
								<RxCross2 />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
