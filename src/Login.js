import Logo from './components/Logo';
import LoginForm from './components/LoginForm';

function Login(){
    return(
        <div className="container">
            <Logo size={150} th={2}/>
            <LoginForm />
      </div>
    )
}

export default Login;