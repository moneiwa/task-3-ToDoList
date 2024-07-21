

import React, { useState } from 'react';
import './index.css';
const Login = ({ onLogin }) => {
const [name, setName] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (event) => {
event.preventDefault();

const storedData = JSON.parse(localStorage.getItem('userData')); // Retrieve or get stored data

if (storedData && name === storedData.username && password === storedData.password) {  //with this condition
alert("We're logging in now ...");
onLogin();
window.location.href = '/'; //go to home
} else {
alert("Invalid username or password");
}
};




return ( 
<div className='bg-img '>
<div className='wrapper'>

<form onSubmit={handleSubmit}>
<h1>Login</h1>
<div className="input-box">


<input type="text" placeholder='Username' onChange={e => setName(e.target.value)} /></div>

<div className='input-box'>
<input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} /></div>

<div className="remember-forgot">

<label>
<input type="checkbox"  /> Remember me
</label>

<a href="#" className='forgot'>Forgot password?</a>
</div>

<button type='submit' className='log'>Login</button>
</form>
<button className='reg' onClick={() => window.location.href = '/Registered'}>Don't have an account? Register</button>
</div>
</div>
);
};

export default Login;
