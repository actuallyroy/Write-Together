import Logo from './components/Logo';
import LoginForm from './components/LoginForm';
import {useParams} from 'react-router-dom'
import { useState } from 'react';

function Login(){
    let params = useParams()
    let loginSignup = params.loginSignup
    return(
        <div className="container">
            <Logo size={150} th={2}/>
            <LoginForm signUp={loginSignup}/>
      </div>
    )
}

export default Login;