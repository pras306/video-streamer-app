import React, { useState, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { auth, provider, db } from '../../api/firebase';
import { signIn } from '../../features/User/UserSlice';

const Login = () => {
    const [ isLogin, setIsLogin ] = useState(true);
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const usrnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateInputs = () => {
        let isValid = true;

        if((!username || username.length <= 0) && !isLogin) {
            setUsername('');
            usrnameRef.current.placeholder = 'Invalid Username';
            usrnameRef.current.style.animation = "shake 1s ease forwards";
            isValid =  false;
        }

        if(!email || !(/^[a-zA-Z0-9-._%+]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email))) {
            setEmail('');
            emailRef.current.placeholder = 'Invalid Email ID';
            emailRef.current.style.animation = "shake 1s ease forwards";
            isValid =  false;
        }

        if(!password || password.length < 6) {
            setPassword('');
            passwordRef.current.placeholder = '6 characters Required';
            passwordRef.current.style.animation = "shake 1s ease forwards";
            isValid =  false;
        }

        return isValid;
    };

    const updateStateWithUser = (userCredential) => {
        // let user = {
        //     username: userCredential.user.displayName,
        //     email: userCredential.user.email,
        //     userId: userCredential.user.uid
        // };
        dispatch(signIn(userCredential));
        navigate('/');
    };

    const handleTabSwitch = (activeTab) => {
        if(isLogin && activeTab === 'login') return;
        if(!isLogin && activeTab === 'register') return;

        setIsLogin(!isLogin);
    };

    const handleLogin = () => {
        if(!validateInputs()) {
            setTimeout(() => {
                if(!isLogin) {
                    usrnameRef.current.style.animation = '';
                    usrnameRef.current.placeholder = 'Enter your username';
                }
                emailRef.current.style.animation = '';
                emailRef.current.placeholder = 'Enter your email';
                passwordRef.current.placeholder = 'Enter your password';
                passwordRef.current.style.animation = "";
            },1000);
            return;
        }
        if(isLogin) {
            signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const docRef = doc(db, 'users', userCredential.user.uid);
                getDoc(docRef)
                .then(doc => {
                    if(doc.exists()) {
                        updateStateWithUser({
                            username: doc.data().username,
                            email: userCredential.user.email,
                            userId: userCredential.user.uid
                        });
                    } else {
                        alert('There is no user with that email.');
                    }
                })
                .catch(err => {
                    alert(err.message);
                });
            })
            .catch(err => {
                alert(err.message);
            });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setDoc(doc(db, 'users', userCredential.user.uid), {
                    username,
                    email,
                    streams: {}
                })
                .then(() => {
                    updateStateWithUser({
                        username,
                        email,
                        userId: userCredential.user.uid
                    });
                })
                .catch(err => {
                    alert(err.message);
                });
            })
            .catch(err => {
                alert(err.message);
            });
        }
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
        .then(userCredential => {
            const docRef = doc(db, 'users', userCredential.user.uid);
                getDoc(docRef)
                .then(docSnap => {
                    if(docSnap.exists()) {
                        updateStateWithUser({
                            username: docSnap.data().username,
                            email: userCredential.user.email,
                            userId: userCredential.user.uid
                        });
                    } else {
                         setDoc(doc(db, 'users', userCredential.user.uid), {
                            username: userCredential.user.displayName,
                            email: userCredential.user.email,
                            streams: {}
                        })
                        .then(() => {
                            updateStateWithUser({
                                username: userCredential.user.displayName,
                                email: userCredential.user.email,
                                userId: userCredential.user.uid
                            });
                        })
                        .catch(err => {
                            alert(err.message);
                        });
                    }
                })
                .catch(err => {
                    alert(err.message);
                });
        })
        .catch(err => {
            alert(err.message);
        });
    };
    
    return (
        <div className='app__login'>
            <div className="app__login-tab">
                <span 
                    className={isLogin ? 'active' : ''} onClick={() => handleTabSwitch('login')}
                >Login</span>
                <span 
                    className={!isLogin ? 'active' : ''}
                    onClick={() => handleTabSwitch('register')}
                >Register</span>
            </div>
            { !isLogin &&
                <div className="app__login-input">
                    <label htmlFor='username'>Username</label>
                    <input 
                        type={'text'} 
                        name='username'
                        placeholder='Enter your username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        ref={usrnameRef}
                    />
                </div>
            }
            <div className="app__login-input">
                <label htmlFor='email'>Email</label>
                <input 
                    type={'email'} 
                    name='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
                />
            </div>
            <div className="app__login-input">
                <label htmlFor='password'>Password</label>
                <input 
                    type={'password'}
                    name='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={passwordRef}
                />
            </div>
            <div className="app__login-btns">
                <button onClick={handleLogin}>Login</button>
                { isLogin &&
                    <div className="app__login-btn" onClick={handleGoogleLogin}>
                        <FcGoogle />
                        <span>Sign in with Google</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;