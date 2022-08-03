import React from 'react';
import { FaHome } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <div className='app__header'>
            <div className='app__header-brand'>
                <Link to={'/'} className="app__header-item">
                    <FaHome />
                    <span>Streamer</span>
                </Link>
            </div>
            <div className="app__header-menu">
                <Link to={'/login'} className="app__header-item">
                    <MdLogin />
                    <span>Login</span>
                </Link>
            </div>
        </div>
    );
};

export default Header;