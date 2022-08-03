import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './Main.css';
import { StreamList, Login } from '../../components/index';

const Main = () => {
    return (
        <div className='app__main'>
            <Routes>
                <Route path='/' element={<StreamList />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    );
};

export default Main;