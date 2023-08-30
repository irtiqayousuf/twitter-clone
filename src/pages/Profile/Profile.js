import React from 'react';
import '../Page.css';
import MainPage from './MainPage/MainPage';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const Profile = () => {
    
    const [user] = useAuthState(auth);
   
    
        return(
            <div className='profilepage'>
             <MainPage user={user}/>
            </div>
        )
}

export default Profile;