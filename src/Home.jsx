import React, { useEffect, useState } from 'react';

const Home = ({ onLogout }) => {


const [todos, setTodos] = useState([]);
const [inputValue, setInputValue] = useState('');
const [searchInquire, setSearchInquire] = useState('');
const [priority, setPriority] = useState('Low');
const [editIndex, setEditIndex] = useState(-1);



useEffect(() => {   ///for local S
const storedTodos = JSON.parse(localStorage.getItem('todos'));
if (storedTodos) {
setTodos(storedTodos);
}
}, []);

useEffect(() => {   /////for local S
localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);




const addOrUpdateTodo = () => {
if (inputValue.trim() === '') return;

if (editIndex === -1) {
setTodos([...todos, { text: inputValue, checked: false, priority }]);
} else {
const updatedTodos = todos.map((todo, index) => 
index === editIndex ? { ...todo, text: inputValue, priority } : todo
);
setTodos(updatedTodos);
setEditIndex(-1);
}

setInputValue('');    //priority start from low
setPriority('Low');
};

const deleteTodo = (index) => {
const newTodos = todos.filter((_, i) => i !== index);
setTodos(newTodos);
};

const checkTodo = (index) => {
const newTodos = todos.map((todo, i) => (
i === index ? { ...todo, checked: !todo.checked } : todo
));
setTodos(newTodos);
};

const handleEdit = (index) => {
const todo = todos[index];
setInputValue(todo.text);
setPriority(todo.priority);
setEditIndex(index);
};

const handleCancelEdit = () => {
setInputValue('');
setPriority('Low');
setEditIndex(-1);
};

const getPriorityColor = (priority) => {
switch (priority) {
case 'High':
return 'red';
case 'Medium':
return 'orange';
case 'Low':
return 'green';
default:
return 'black';
}
};


const handleSearchChange = (event) => {
setSearchInquire(event.target.value);
};
const filteredTodos = todos.filter((data) =>
data.text.toLowerCase().includes(searchInquire.toLowerCase())
);

return (
<div>
<h2></h2>
<button className='onlogout' onClick={onLogout}> Logout</button>
<div className="todo-container">
<h1>ToDo List</h1>
<div className="input-container">
<label></label>
<input
type="search"
placeholder='Search here'
value={searchInquire}
onChange={handleSearchChange}
/>
<input type="text" value={inputValue}
onChange={(e) => setInputValue(e.target.value)}
placeholder="Add a new todo"
className="todo-input"
/>
<select
value={priority}
onChange={(e) => setPriority(e.target.value)}
className="priority-select"
>
<option value="Low">Low</option>
<option value="Medium">Medium</option>
<option value="High">High</option>
</select>



<button onClick={addOrUpdateTodo} className="add-button">
{editIndex === -1 ? 'Add' : 'Update'}
</button>


{editIndex !== -1 && (
<button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
)}
</div>


<table className="todo-table">
<thead>
<tr>
<th>Check</th>
<th>Task</th>
<th>Priority</th>
<th>Action</th>
</tr>

</thead>
<tbody>
{filteredTodos.map((todo, index) => (
<tr key={index} className={todo.checked ? 'completed' : ''}>
<td> <input type="checkbox" checked={todo.checked}
onChange={() => checkTodo(index)}/>
</td>

<td>{todo.text}</td>
<td style={{ color: getPriorityColor(todo.priority) }}>{todo.priority}</td>
<td><button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
<button onClick={() => deleteTodo(index)} className="delete-button">Delete</button>
</td>
</tr>
))}

</tbody>
</table>
</div>
</div>
);
};

export default Home;
