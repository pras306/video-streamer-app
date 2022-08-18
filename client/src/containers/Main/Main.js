import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './Main.css';
import { StreamList, Login, StreamCreate } from '../../components/index';
import Stream from '../Stream/Stream';

const Main = () => {
    return (
        <div className='app__main'>
            <Routes>
                <Route path='/' element={<StreamList />} />
                <Route path='/login' element={<Login />} />
                <Route path='/stream' element={<Stream />} />
                <Route path='/stream/create' element={<StreamCreate />} />
            </Routes>
        </div>
    );
};

export default Main;