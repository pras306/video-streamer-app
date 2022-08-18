import React from 'react';

import './StreamCard.css';

const StreamCard = ({ title, streamer, isLive }) => {
    return (
        <div className={ isLive ? 'app__stream-card-active' : 'app__stream-card'}>
            <div className="app__stream-card-title">{title}</div>
            <div className="app__stream-card-content">{streamer}</div>
            <div className={isLive ? "app__stream-card-flag success" : "app__stream-card-flag error"}>
                {isLive ? 'Live' : 'Not Live'}
            </div>
        </div>
    );
};

export default StreamCard;