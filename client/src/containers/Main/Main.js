import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { StreamList, Login } from '../../components/index';

const Main = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route path='/' element={<StreamList />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </React.Fragment>
    );
};

export default Main;