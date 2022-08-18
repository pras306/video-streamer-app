import React from 'react';
import { useSelector } from 'react-redux';

import './Stream.css';

const Stream = () => {
    const { streamName } = useSelector(store => store.stream);
    const { username } = useSelector(store => store.user);

    return (
        <div>Welcome to {username}'s stream titled {streamName}</div>
    );
};

export default Stream;