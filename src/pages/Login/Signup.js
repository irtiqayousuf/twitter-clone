import React ,{ useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import twitterLogo from '../../assets/images/twitterLogo.jpg';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Login.css";


const Signup = () => {
    {
        const [username,setUsername] = useState('');
        const [email,setEmail] = useState('');
        const [name,setName] = useState('');
        const [password,setPassword] = useState('');
        // const [error,setError] = useState();
        const navigate = useNavigate();

        const [
            createUserWithEmailAndPassword,
            user,
            loading,
            error,
          ] = useCreateUserWithEmailAndPassword(auth);

          const [
            signInWithGoogle, 
            googleuser, 
            googleloading, 
            googleerror
        ] = useSignInWithGoogle(auth);

          if (user || googleuser)
          {
               navigate('/');
               console.log(user);
               console.log(googleuser);
          }
         
          if (error){
             console.log(error.message);
          }
         
          if (loading){
             console.log('loading');
          }
    
    const handleSubmit = e =>{
        e.preventDefault();
        console.log('email =',email + " " +'password =' ,password);
        createUserWithEmailAndPassword(email,password);
        const user = {
            username : username,
            name : name,
            email : email,
        }
        axios.post(`http://localhost:5000/register`,user);
    }

    const handleGoogleSignIn=()=>{
        signInWithGoogle();
    }
        return(
           <div className='login-container'>
                 <div className='Image-container'>
                <img src={twitterLogo}  className="image" alt=""/>
                 </div>
                 
                  <div className="form-container">
                  <TwitterIcon 
                  className='Twittericon'
                  style={{ color: "black" }} />

                        <h2 className="heading">Happening now</h2>                         
                        <div class="d-flex align-items-sm-center">
                            <h3 className="heading1"> Join twitter today </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input type="text"
                            className='display-name'
                            placeholder='@username'
                            onChange={(e) => setUsername(e.target.value)}
                            />

                            <input type="text"
                            className='display-name'
                            placeholder='Enter Full name'
                            onChange={(e) => setName(e.target.value)}
                            />
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
                                   Sign up
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
                            Already have an acoount?
                            <Link 
                            to='/Login'
                            style={{
                                textDecoration:'none',
                                color:'black',
                                fontWeight:'600',
                                marginLeft:'5px'

                            }} >Login</Link>
                        </div>
                 </div>
              

            </div>
        )
    }

}

export default Signup;