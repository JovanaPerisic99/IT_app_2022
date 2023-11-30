import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { Button } from './Button';
import { FaBookOpen } from "react-icons/fa";
import './NavBar.css';

function NavBar(props) {
    const token = localStorage.getItem('token')
    const [isLoggedIn, setIsLoginMode] = useState(!token)  
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const logOut = () => {
        closeMobileMenu();
        setIsLoginMode(false);
        localStorage.removeItem('token');
        props.handleUserId();
    }
    const showButton = () => {
        if(window.innerWidth <=960){ 
            setButton(false);
        }else{
            setButton(true);
        }
    };

    useEffect(()=>{showButton();},[]) 
    window.addEventListener('resize',showButton); 


    return (
    <>
        <nav className='navbar'>
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu} target='_top'>
                    <FaBookOpen className='logo-icon'/> BEx
                </NavLink>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times': 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active':'nav-menu'}>
                    <li className='nav-item'>
                        <NavLink to='/' className='nav-links' onClick={closeMobileMenu} target='_top'>
                            Home
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/browse' className='nav-links' onClick={closeMobileMenu} target='_top'>
                            Browse
                        </NavLink>
                    </li>
                    {!isLoggedIn && (
                        <li className='nav-item'>
                            <NavLink to={`/${props.userId}/mybooks`} className='nav-links' onClick={closeMobileMenu} target='_top'>
                                MyBooks
                            </NavLink>
                        </li>)}
                    {isLoggedIn && (
                        <li className='nav-item'>
                            <NavLink to='/authentication' className='nav-links-mobile' onClick={closeMobileMenu} target='_top'>
                                Sign Up
                            </NavLink>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li className='nav-item'>
                            <NavLink to='/authentication' className='nav-links-mobile' onClick={logOut} target='_top'>
                                Log Out
                            </NavLink>
                        </li>
                    )}
                </ul>
                {button && isLoggedIn && <Button pathTo='/authentication' buttonStyle='btn--outline'>SIGN UP</Button>}
                {button && !isLoggedIn && <Button pathTo='/' onClick={logOut} buttonStyle='btn--outline'>LOG OUT</Button>}
            </div>
        </nav>
    </>
    )
}


export default NavBar

