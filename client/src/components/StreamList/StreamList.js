import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import './StreamList.css';
import { db } from '../../api/firebase';
import { StreamCard } from '../index';

const StreamList = () => {
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        const getStreams = async () => {
            let response = await getDocs(collection(db, 'users'));
            return response;
        };

        getStreams()
        .then(data => {
            let userStreams = [];
            data.forEach(doc => {
                // if(Object.entries(doc.data().streams).length > 0) userStreams.push(doc.data().streams);
                if(doc.data().streams.length > 0) {
                    userStreams = [...userStreams, ...doc.data().streams];
                }
            });
            setStreams(userStreams);
        })
        .catch(err => {
            alert(err.message)
        });
    }, [setStreams]);

    return (
        <div className='app__stream-list'>
            <h2>Total Number of Streams: {streams.length}</h2>
            <span>
                {streams?.map((stream, idx) => {
                    return <StreamCard key={idx} title={stream.streamName} streamer={stream.streamer} isLive={stream.isLive} />
                })}
            </span>
        </div>
    );
};

export default StreamList;