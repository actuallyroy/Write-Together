import React, { Component } from 'react';
import "./LoginForm.css"
import FormInput from './FormInput'

class LoginForm extends Component {
    render() {
        return (
            <div className='loginFormContainer'>
                <div className='loginSignUpForm'>
                    <div className='form login'>
                        <div className='toplabel'>Login</div>
                        <div>
                            <FormInput placeholder="Email"/>
                            <FormInput type="password" placeholder="Password"/>
                        </div>
                        <div>
                            <button className='formBtn'>Login</button>
                        </div>
                        <div className='b'
                            onClick={() =>{
                                let login = document.querySelector('.loginSignUpForm');
                                login.style.animation = "flipLeft 800ms forwards"
                            }}
                        >Create a new account</div>
                    </div>
                    <div className='form signUp'>
                        <div className='toplabel'>Sign Up</div>
                        <div>
                            <FormInput placeholder="Username"/>
                            <FormInput placeholder="Full Name"/>
                            <FormInput placeholder="Email"/>
                            <FormInput type="password" placeholder="Password"/>
                        </div>
                        <div>
                            <button className='formBtn'>Sign Up</button>
                        </div>
                        <div className='b'
                            onClick={() =>{
                                let login = document.querySelector('.loginSignUpForm');
                                login.style.animation = "flipRight 800ms forwards"
                            }}
                        >Already have an account?</div>
                    </div>
                </div>
                <p>
                    "We write to taste life twice,<br/>
                    in the moment and in retrospect."<br/><br/>
                    -Anaïs Nin
                </p>
            </div>
        );
    }
}

export default LoginForm;