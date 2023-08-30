import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Widgets from './Widgets/Widgets';
import auth from '../firebase.init';
import { useAuthState} from 'react-firebase-hooks/auth';
import '../App.css';
import { signOut } from 'firebase/auth';
import { Outlet } from 'react-router-dom';
// import useLoggedInUser from '../hooks/useLoggedInUser';

const Home = () => {
    const user = useAuthState(auth);
    //console.log(user[0]?.email);
    // const [loggedInUser] = useLoggedInUser();
    // console.log (loggedInUser);

    const handleLogout = () =>{
    signOut(auth);    
}
    
        return(
            <div className='app'>
            <Sidebar handleLogout={handleLogout} user={user}/>
            <Outlet/>
            <Widgets/>
            </div>
        );      
}

export default Home;