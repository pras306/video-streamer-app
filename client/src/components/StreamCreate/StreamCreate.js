import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

import './StreamCreate.css';
import { createStream } from '../../features/Stream/StreamSlice';
import { db } from '../../api/firebase';

const StreamCreate = () => {
    const { userId, username } = useSelector(store => store.user);
    const [streamName, setStreamName] = useState('');
    const streamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateInput = () => {
        let isValid = true;

        if(streamName.length <= 3) {
            isValid = false;
            setStreamName('');
            streamRef.current.placeholder =  'Minimum 4 characters';
            streamRef.current.style.animation = 'shake 1s ease forwards'
        }

        return isValid;
    }

    const handleClear = () => {
        setStreamName('');
    };

    const handleCreateStream = () => {
        if(!validateInput()) {
            setTimeout(() => {
                streamRef.current.placeholder = 'Enter Stream Name';
                streamRef.current.style.animation = '';
            }, 1000);

            return;
        }

        let createdStream = {
            streamName,
            isLive: true,
            streamer: username
        };
        dispatch(createStream(streamName));
        updateDoc(doc(db, 'users', userId), {
            streams: arrayUnion(createdStream)
        })
        .then(() => {
            alert('Stream created')
        })
        .catch(err => {
            alert(err.message);
        });

        navigate('/stream');
    }

    return (
        <div className='app__stream-create'>
            <div className="app__stream-create-title">
                <h2>Create Stream</h2>
            </div>
            <div className="app__stream-create-input">
                <label htmlFor='name'>Stream Name</label>
                <input name='name' ref={streamRef} type={'text'} placeholder='Enter Stream Name' value={streamName} onChange={(e) => setStreamName(e.target.value)} />
            </div>
            <div className="app__stream-create-btns">
                <button onClick={handleCreateStream}>Create</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </div>
    );
};

export default StreamCreate;