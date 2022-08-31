import React, { Component } from 'react';
import "./LoginForm.css"
import { constants } from '../constants'
import Loading from './Loading'
var axios = require('axios')
class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: 'none'
    }
  }

  render() {
    let flip = "none"
    if(this.props.signUp.toLowerCase() === 'signup'){
      flip = "flipLeft 800ms forwards"
    }
    return (
      <div className='loginFormContainer'>
        <div className='loginSignUpForm' style={{animation: flip}}>
          <div className='form login'>
            <div className='toplabel'>Login</div>
            <div>
              <input onInput={()=> removeError('username1')} className='inpt' placeholder="Username" id='username1'/>
              <input onInput={() => removeError('password')} type="password" className='inpt' placeholder="Password" id='password' />
              <Loading showLoading={this.state.showLoading} size={70} />
              <div className='error-message'>Error</div>
            </div>
            <div>
              <button onClick={async () => {
                let username = document.getElementById("username1").value
                let password = document.getElementById("password").value
                if (Boolean(username) && Boolean(password)) {
                  this.setState({ showLoading: "block" });
                  let hashedPassword = await sha256(password)
                  axios.post(`${constants.API_HOST}/api/login/`, {
                    username: username,
                    password: hashedPassword
                  })
                  .then((res) => {
                    window.localStorage.setItem("token", res.data.loginMessage)
                    window.localStorage.setItem("username", username)
                    window.location.href = "/feed"
                  })
                  .catch((error) => {
                    setError("", error.response.data.loginMessage, 0)
                    this.setState({showLoading: 'none'})
                  })
                }else{
                  if(!Boolean(username))
                    setError('username1', errorMessages[0], 0)
                  if(!Boolean(password))
                    setError('password', errorMessages[0], 0)
                }
              }} className='formBtn'>Login</button>
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
              <input onInput={() => removeError('username')} className='inpt' placeholder="Username" id='username'/>
              <input onInput={() => removeError('fullname')} className='inpt' placeholder="Full name" id='fullname'/>
              <input onInput={() => removeError('email1')} className='inpt' placeholder="Email" id='email1'/>
              <input onInput={() => removeError('password1')} type="password" className='inpt' placeholder="Password" id='password1'/>
              <input onInput={() => removeError('password2')} type="password" className='inpt' placeholder="Confirm Password" id='password2' />
              <Loading showLoading={this.state.showLoading} size={70} />
              <div className='error-message'>Error</div>
            </div>
            <div>
              <button
                onClick={ async() =>{
                  let username = document.getElementById("username").value
                  let fullname = document.getElementById("fullname").value
                  let email = document.getElementById("email1").value
                  let password = document.getElementById("password1").value
                  let cPassword = document.getElementById("password2").value
                  if (Boolean(username) && Boolean(fullname) && Boolean(email) && Boolean(password) && password === cPassword) {
                      this.setState({showLoading: 'block'})
                      let hashedPassword = await sha256(password)
                      axios.post(`${constants.API_HOST}/api/signup/`, {
                        username: username,
                        name: fullname,
                        email: email,
                        password: hashedPassword,
                      })
                      .then(data =>{
                        document.querySelector(".error-message").style.visibility = 'visible'
                        document.querySelector(".error-message").style.color = 'green'
                        document.querySelector(".error-message").innerHTML = "Account created successfully"
                        setTimeout(() => {
                          window.location.reload() 
                        }, 1000);
                      })
                      .catch((error) =>{
                        // document.querySelector(".error-message").innerHTML = error.response.data.errorMesage.message
                        if(error.response.data.errorMessage.keyPattern){
                          setError("username", errorMessages[2], 1)
                        }else{
                          setError("email1", errorMessages[3], 1)
                        }
                        this.setState({showLoading: 'none'})
                      })
                    }else{
                      if(!Boolean(username)){
                        setError('username', errorMessages[0], 1)
                      }
                      if(!Boolean(email)){
                        setError('email1', errorMessages[0], 1)
                      }
                      if(!Boolean(fullname)){
                        setError('fullname', errorMessages[0], 1)
                      }
                      if(password !== cPassword)
                        setError('password2', errorMessages[1], 1)
                        setError('password1', errorMessages[1], 1)
                      if(!Boolean(password)){
                        setError('password1', errorMessages[0], 1)
                      }
                      if(!Boolean(cPassword)){
                        setError('password2', errorMessages[0], 1)
                      }

                    }
                  }
                }
               className='formBtn'>Sign Up</button>
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

let errorMessages = [
  'Please fill all mandatory fields',
  'Passwords do not match.',
  'Username already exists.',
  'Enter valid email',
  "User doesn't exist",
  "Wrong password"

]

function setError(id, message, c){
  if(id !== ""){
    document.getElementById(id).style.borderColor = "red"
  }
  document.querySelectorAll(".error-message")[c].style.visibility = 'visible'
  document.querySelectorAll(".error-message")[c].innerHTML = message
}


function removeError(id){
  document.getElementById(id).style.borderColor = "#FFE9C9"
  document.querySelectorAll(".error-message")[0].style.visibility = 'hidden'
  document.querySelectorAll(".error-message")[1].style.visibility = 'hidden'
}





async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);          

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string          
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export default LoginForm;