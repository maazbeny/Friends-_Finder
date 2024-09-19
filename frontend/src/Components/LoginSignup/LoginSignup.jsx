import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginSignup.css';
import logo from '../Assets/logo.png';

const LoginSignup = () => {
    const [state, setState] = useState("signup");
    const [notvalid, setNotValid] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const navigate = useNavigate();
    const changeValue = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const signup = async () => {
        let responseData;
        await fetch("http://localhost:5001/signup", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then((resp) => resp.json()).then((data) => responseData = data);
        if (responseData.success) {
            setFormData({
                username: "",
                password: "",
                email: "",
            });
            setState("login");
            console.log(formData);
        }
        else {
            setNotValid(responseData.error)
        }
    }


    const login = async () => {
        let responseData;
        await fetch("http://localhost:5001/login", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then((resp) => resp.json()).then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            if (localStorage.getItem("auth-token")) {
                navigate(`/dashboard/${responseData.id}`);
            }

        } else {
            setNotValid(responseData.error);
        }

        setFormData({
            username: "",
            password: "",
            email: ""
        });
        console.log(formData);
    };
    const handlekeypress = (e) => {
        if (e.key === "Enter") {
            if (state === "login") {
                login()
            }
            else {
                signup()
            }

        }
    }

    return (
        <div className='login-signup'>
            <div className="freind-forever-logo">
                <img className='frnd-logo' src={logo} alt="" />
                <h1>Friend Finder</h1>
            </div>
            <h1 className='find-hd'>{state === "login" ? "Login" : "Signup"}</h1>
            <div className="login-signup-box">
                <div className="login-signup-input">
                    <p>{state === "signup" ? "Signup now" : "Login now"} and meet awesome people around the world</p>
                    {state === "signup" && (
                        <input value={formData.username} name='username' onChange={changeValue} placeholder='Enter name' type="text" />
                    )}
                    <input value={formData.email} onChange={changeValue} name='email' placeholder='Enter email' type="text" />
                    <input value={formData.password} onKeyDown={handlekeypress} onChange={changeValue} name='password' placeholder='Enter a password' type="password" />
                    {notvalid && <p style={{ color: "red" }} className="error-message">{notvalid}</p>}
                </div>
                <div className="checkbox">
                    <input className='check' type="checkbox" name="checkbox" id="" />
                    <p>By signing up you agree to the terms</p>
                </div>
            </div>
            <button onClick={() => state === "login" ? login() : signup()} className={state === "login" ? "login-btn" : "signup-btn"}>
                {state === "login" ? "Login" : "Signup"}
            </button>
            <p className='click'>
                {state === "login" ? "Create an account?" : "Already have an account?"}
                <span style={{ textDecoration: 'underline' }} onClick={() => setState(state === "login" ? "signup" : "login")}>
                    {state === "login" ? " signup" : " login"}
                </span>
            </p>
        </div>
    );
};

export default LoginSignup;
