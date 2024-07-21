import React, { useState } from 'react';

const Registered = () => {
const [name, setName] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (event) => {
event.preventDefault();

const userData = { username: name, password: password };
localStorage.setItem('userData', JSON.stringify(userData)); // Store data as JSON

alert("Registration successful!");
window.location.href = '/login'; // Switch to login form after registration
};

return (
<div className='wrapper'>
<form onSubmit={handleSubmit}>

<h1>Register</h1>

<div className="input-box">
<input type="text" placeholder='Username' required onChange={e => setName(e.target.value)} />
</div>

<div className='input-box'>
<input type="password" placeholder='Password' required onChange={e => setPassword(e.target.value)} />
</div>

<div className="remember-forgot">
<label><input type="checkbox" /> Remember me</label>
</div>

<button type='submit'>Register</button>
</form>

<button onClick={() => window.location.href = 'Login'}>Already have an account? Login</button>
</div>
);
};

export default Registered;
