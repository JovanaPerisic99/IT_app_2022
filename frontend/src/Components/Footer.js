import React from 'react';
import {Link} from 'react-router-dom';
import { FaBookOpen } from "react-icons/fa";
import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
        <div className='footer-links'>
            <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                    <Link to='/' className='logo-link' target="_top">
                        <FaBookOpen className='logo-icon'/> BEx 
                    </Link>
                </div>
            </div>
            <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                    <h2>About us</h2>
                    <Link to='/'>The Project</Link>
                    <Link to='/'>The Users</Link>
                </div>
                
                <div className='footer-link-items'>
                    <h2>Contact us</h2>
                    <Link to='/'>Email</Link>
                    <Link to='/'>Phone</Link>
                </div>
            </div>
            <div className='.social-media-wrap'>
                <div className='footer-link-items social-icons'>
                    <a href="https://www.facebook.com/" className='social-icon-link facebook' target='_blank'>
                        <i className='fab fa-facebook-f'></i>
                    </a>
                </div>
                <div className='footer-link-items social-icons'>
                    <a href="https://www.instagram.com/" className='social-icon-link instagram' target='_blank'>
                        <i className='fab fa-instagram'></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer