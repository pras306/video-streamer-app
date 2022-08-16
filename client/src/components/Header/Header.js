import React from 'react';
import { FaHome } from 'react-icons/fa';
import { MdLogin, MdLogout, MdOutlineNotStarted } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Header.css';
import { signOut } from '../../features/User/UserSlice';

const Header = () => {
    const { username, email } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = (user) => {
        dispatch(signOut());
        navigate('/');
        alert(`${user} has logged out successfully`);
    }

    const renderIsLogged = () => {
        let checkUser = username?.length > 0 ? username : email;
        if(checkUser?.length) {
            return (
                <>
                    <div className="app__header-item">
                        <MdOutlineNotStarted />
                        <span>Start Streaming</span>
                    </div>
                    <div className="app__header-item" onClick={() => handleLogOut(checkUser)}>
                        <MdLogout />
                        <span>Logout</span>
                    </div>
                </>
            );
        } else {
            return(
                <Link to={'/login'} className="app__header-item">
                    <MdLogin />
                    <span>Login</span>
                </Link>
            );
        }
    }

    return (
        <div className='app__header'>
            <div className='app__header-brand'>
                <Link to={'/'} className="app__header-item">
                    <FaHome />
                    <span>Streamer</span>
                </Link>
            </div>
            <div className="app__header-menu">
                {renderIsLogged()}
            </div>
        </div>
    );
};

export default Header;