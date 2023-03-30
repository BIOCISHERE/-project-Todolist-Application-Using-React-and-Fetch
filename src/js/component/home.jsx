import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [listTodos, setListTodos] = useState([]);

	const get = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/BIOCISHERE')
		.then(res => {
			if(res.status >= 200 && res.status < 300){
				console.log('request success');
				return res.json();
			}
		})
		.then(data => setListTodos(data))
		.catch(error => console.error('Error:', error))
	}

	useEffect(() => {
		get();
	}, [])

	return (
		<div className="container">
			<h1 className="text-center">List of my todos</h1>
			<p className="text-center">
				Click on the input, add your todo and press enter
			</p>
			<p className="text-center">
				Then to delete, hover on a task and click on the trashcan icon
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
										setListTodos(listTodos.concat({'label': inputValue, 'done': false}));
										setInputValue("");
									}
								}
							}}
						/>
					</li>
					{listTodos.map((todo, index) => (
						<li key={index} className="showAndHide border-bottom my-1 p-1">
							{todo.label}
							<i
								className="fas fa-trash-alt float-end py-1 pe-2"
								onClick={() =>
									setListTodos(
										listTodos.filter(
											(todo, currentIndex) => index != currentIndex
										)
									)
								}
							></i>
						</li>
					))}
				</ul>
				<h4 className="text-center">{listTodos.length} tasks left</h4>
			</div>
		</div>
	);
};

export default Home;
// https://assets.breatheco.de/apis/fake/todos/user/85
// https://assets.breatheco.de/apis/fake/todos/user/BIOCISHERE
