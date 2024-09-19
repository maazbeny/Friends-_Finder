import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Navbar = () => {
    const { id } = useParams();

   
    return (
        <div className='navbar'>
            <div className="logo-search">
                <div className="frnds-logo">
                    <img src={logo} alt="" />
                    <Link className='heading-link' to='/'><h1>Friend Finder</h1></Link>
                </div>

                <div className="search-bar">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder='Search Freinds' />

                </div>
            </div>
            <div className="nav-menu">
                <li>Home</li>
                <li>Newsfeed</li>
                <li>Timeline</li>
                <li>All Pages</li>
                <li>Contact</li>
            </div>

        </div>
    )
}

export default Navbar