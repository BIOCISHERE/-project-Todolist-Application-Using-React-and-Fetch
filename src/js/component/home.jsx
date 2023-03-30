import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [listTodos, setListTodos] = useState([]);

	const get = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/biocishere')
		.then(res => res.json())
		.then(data => setListTodos(...listTodos, data))
	}

	const put = (todo) => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/biocishere', {
			method: "PUT",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json"
            }
		})
		.then(res => res.json())
		.then(data => console.log(data))
	}

	useEffect(() => {
		get();
	}, [])

	
	useEffect(() => {
		put(listTodos);	
	}, [listTodos])

	return (
		<div className="container mt-2">
			<h1 className="text-center">List of my todos</h1>
			<p className="text-center">
				Click on the input, add your todo and press enter.
			</p>
			<p className="text-center">
				Then to delete, hover on a task and click on the trashcan icon.
			</p>
			<p className="text-center">
				If you have no tasks, then when you reload the page it'll show your last added task.
			</p>
			<div className="border border-secondary rounded p-1">
				<ul className="p-0 mx-0">
					<li className="border-bottom p-1">
						<input
							type="text"
							placeholder="What needs to be done?"
							className="w-100 border-0"
							onChange={(e) => setInputValue(e.target.value)}
							value={inputValue}
							onKeyUp={(e) => {
								if (e.key === "Enter") {
									if (inputValue === "") {
										alert("No tasks, add a task");
									} else {
										setListTodos(listTodos.concat( { "label": inputValue, "done": false } ));
										setInputValue("");
										put(listTodos);
									};
								};
							}}
						/>
					</li>
					{listTodos.map((todo, index) => (
						<li key={index} className="showAndHide border-bottom my-1 p-1">
							{todo.label}
							<i
								className="fas fa-trash-alt float-end py-1 pe-2"
								onClick={() =>{
									put(listTodos),
									setListTodos(
										listTodos.filter(
											(todo, currentIndex) => (index != currentIndex)
										)
									)}
								}
							></i>
						</li>
					))}
				</ul>
				<h4 className="text-center">{listTodos.length} tasks left</h4>
				<div className="text-center m-1">
				    <button type="button" className="btn btn-danger my-2" onClick={() => setListTodos([])}>Delete all tasks</button> <br />
					<span>After clicking the button, create a new task to save changes.</span>
				</div>
			</div>
		</div>
	);
};

export default Home;
// https://assets.breatheco.de/apis/fake/todos/user/85
// https://assets.breatheco.de/apis/fake/todos/user/BIOCISHERE
