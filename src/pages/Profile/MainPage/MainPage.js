import React ,{useState ,useEffect} from 'react';
import './MainPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LockResetIcon from '@mui/icons-material/LockReset';
import AddLinkIcon from '@mui/icons-material/AddLink';
import{ useNavigate } from "react-router-dom";
import useLoggedInUser from '../../../hooks/useLoggedInUser'
import Post from '../../Feed/Post/Post';
import axios from 'axios';
import EditProfile from '../EditPage/EditProfile';

const MainPage = ( {user} ) => {
    //console.log(user);    
    const navigate = useNavigate();
   const username = user?.email?.split('@')[0];
   const [loggedInUser] =useLoggedInUser();
   const [imageURL,setImageURL ] = useState(''); 
   const [isLoading,setIsLoading ] = useState(''); 
   const [posts,setPosts]=useState([]);
    
   useEffect(()=>{
       fetch(`http://localhost:5000/userPost?email=${user?.email}`)
       .then(res =>res.json())
       .then(data => {
          setPosts(data);
       })
   },[posts,user?.email])

   const handleUploadCoverImage = (e) => {
    setIsLoading(true) ;
    const image = e.target.files[0];
    const formData = new FormData () ;
    formData.set('image', image) ;

    axios.post("https://api.imgbb.com/1/upload?key=17c7f7e3b1584128902ee57d52eb4f2f", formData)
    .then( res => {
        const url = res.data.data.display_url;
        const userCoverImage ={
            email : user?.email,
            coverImage : url
        }
       // setImageURL(url);
        setIsLoading (false);
        if(url)        {
            axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,userCoverImage)
        }
    })
}

const handleUploadProfileImage =(e) => {
    setIsLoading(true) ;
    const image = e.target.files[0];
    const formData = new FormData () ;
    formData.set('image', image) ;

    axios.post("https://api.imgbb.com/1/upload?key=17c7f7e3b1584128902ee57d52eb4f2f", formData)
    .then( res => {
        const url = res.data.data.display_url;
        const userProfileImage ={
            email : user?.email,
            profileImage : url
        }
       // setImageURL(url);
        setIsLoading (false);
        if(url)        {
            axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,userProfileImage)
          
        }
    })

}
        return(
            <div className= 'MainPage'>
            <ArrowBackIcon className='arrow-icon' onClick={()=>(navigate('/'))} />
            <h4 className='heading-4'>@{username}</h4>
            <div className='mainprofile'>
                <div className='profile-bio'>
                    {
                        <div>
                            <div className='coverImageContainer'> 
                            <img src={loggedInUser[0]?.coverImage?loggedInUser[0]?.coverImage:'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=720'} alt="" className='coverImage'/>                       
                            <div className='hoverCoverImage'>    
                            <div className="imageIcon_tweetButton">                      
                            <label htmlFor='image' className='imageIcon'>
                                {
                                    isLoading ? <LockResetIcon className='photoIcon photoIconDisabled'/> :
                                    <CenterFocusWeakIcon className='photoIcon'/>
                                    }
                            </label>
                                <input type='file' id='image' className='imageInput' onChange={handleUploadCoverImage}/>
                                 </div>
                                 </div>
                            </div>
                            <div className='avatar-img'>
                                <div className='avatarContainer'>
                                <img src={loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=720'} alt="" className='avatar'/>                               
                            <div className='hoverAvatarImage'>
                            <div className='imageIcon_tweetButton'>
                            <label htmlFor='profileImage' className='imageIcon'>
                            {
                                    isLoading ? <LockResetIcon className='photoIcon photoIconDisabled'/> :
                                    <CenterFocusWeakIcon className='photoIcon'/>
                                    }
                            </label>
                            {/* <div className='imageIcon_tweetButton'> */}
                                <input type='file' id='profileImage' className='imageInput' onChange={handleUploadProfileImage}/> 
                            </div>
                                    </div>
                                </div>
                            {/* </div>  */}
                            <div className='userInfo'>
                                <div>
                                    <h3 className='heading-3'> 
                                    {loggedInUser[0]?.name ? loggedInUser[0]?.name:user&&user?.displayName}
                                    </h3>
                                    <p className='usernameSection'>@{username}</p>
                                </div>
                             <EditProfile user={user} loggedInUser={loggedInUser}/>
                        </div>

                                <div className='infoConatiner'>
                                {loggedInUser[0]?.bio ? loggedInUser[0]?.bio:''}
                                <div className='locationAndLink'>
                                {loggedInUser[0]?.location ? <p className='subInfo'><MyLocationIcon/>{loggedInUser[0]?.location}</p> :''}  
                                {loggedInUser[0]?.website ? <p className='subInfo link '><AddLinkIcon/>{loggedInUser[0]?.website}</p> :''}  
                                </div>
                                </div>
                                <h4 className='tweetsText'>Tweets</h4><hr/>
                                </div>      
                                {
                                    posts.map(p=><Post id={p._id} p={p} />)
                                }                                                    
                            </div>
                    }
                </div>
               </div>
            </div>
        )
    }

export default MainPage;