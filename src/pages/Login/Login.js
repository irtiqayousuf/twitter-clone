import React, { useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import twitterLogo from '../../assets/images/twitterLogo.jpg';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleButton} from 'react-google-button';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState();
    const navigate = useNavigate();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        usererror,
    ] = useSignInWithEmailAndPassword(auth);

          const [
            signInWithGoogle, 
            googleuser, 
            googleloading, 
            googleerror
        ] = useSignInWithGoogle(auth);
     
    if (user || googleuser) {
        navigate('/');
        console.log(user);
        console.log(googleuser);
    }

    if (error) {
        console.log(error.message);
    }

    if (loading) {
        console.log('loading');
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('email =', email + " " + 'password =', password);
        signInWithEmailAndPassword(email, password);
    }

    const handleGoogleSignIn=()=>{
        signInWithGoogle();
    }
    return (
        <div className='login-container'>
            <div className='Image-container'>
                <img src={twitterLogo}  className="image" alt="" />
            </div>
            <div className='form-container'>
                <TwitterIcon
                className='Twittericon'
                 style={{ color: "black" }} />
                <h2 className="heading">Happening now</h2>
                <div class="d-flex align-items-sm-center">
                            <h3 className="heading1"> What happeniong today </h3>
                        </div>

                <form onSubmit={handleSubmit}>
                    <input type="Email"
                        className='email'
                        placeholder='Enter Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input type="Password"
                        className='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div>
                        <button type="submit" className='btn'>
                            Login
                        </button>
                    </div>
                </form>
                <hr/>
                        <div className='google-button'>
                            <GoogleButton
                            className='g-btn'
                            type='light'
                            onClick={handleGoogleSignIn}
                            />
                        </div>
                        <div>
                            Don't have acoount?
                            <Link
                            to='/signup'
                            style={{
                                textDecoration:'none',
                                color:'black',
                                fontWeight:'600',
                                marginLeft:'5px'

                            }} >Sign Up</Link>
                        </div>

            </div>

        </div>
    )
}
export default Login;