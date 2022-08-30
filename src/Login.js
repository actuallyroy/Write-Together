import Logo from './components/Logo';
import LoginForm from './components/LoginForm';
let loginSignup = 'none'

function Login() {
    if(window.location.href.includes("signup"))
        loginSignup = "signup"
    return(
        <div className="container">
            <Logo size={150} th={2}/>
            <LoginForm signUp={loginSignup}/>
      </div>
    )
}

export default Login;