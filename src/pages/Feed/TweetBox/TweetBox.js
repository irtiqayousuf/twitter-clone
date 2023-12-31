import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import axios from 'axios';
import "./TweetBox.css";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const TweetBox=() => {
    const [post,setPost] = useState('');
    const [imageURL,setImageURL ] = useState(''); 
    const [isLoading,setIsLoading ] = useState(''); 
    const [userProfilePic,setUserProfilePic ] = useState(''); 
    const [user] = useAuthState(auth);
    const [name,setName ] = useState(''); 
    const [username,setUsername ] = useState(''); 
   // const [email,setEmail ] = useState(''); 
    const [loggedInUser] = useLoggedInUser();
   // console.log (loggedInUser);

   const email = user ?.email;

   const useProfilePic = loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000"


    const handleUploadImage = (e) => {
        setIsLoading(true) ;
        const image = e.target.files[0];
        const formData = new FormData () ;
        formData.set('image', image) ;

        axios.post("https://api.imgbb.com/1/upload?key=17c7f7e3b1584128902ee57d52eb4f2f", formData)
        .then( res => {
            setImageURL(res.data.data.display_url);
            console.log(res.data.data.display_url);
            setIsLoading (false);
        })
        .catch((error)=>
        {
            console.log(error);
            setIsLoading (false);
        })  
        console.log(image);
       
}
 
const handleTweet = (e) => {
    e.preventDefault(); 
    if(user.providerData[0].providerId === 'password'){
    fetch(`http://localhost:5000/loggedInUser?email=${email}`)
    .then(res => res.json())
    .then(data => {
        setName(data[0]?.name);
        setUsername(data[0]?.username);
    })
}else{
     setName(user?.displayName)
     setUsername(email?.split('@')[0]);   
}
//if(user?providerData[0]?.provider)

    if(name){
    const userPost = {
        profilePhoto : userProfilePic,
        post :post,
        photo : imageURL,
        username : username ,
        name : name,
        email : email 
    }
     //console.log(userPost);
setPost('');
setImageURL('');

     fetch(`http://localhost:5000/post`,{
     method : "POST",
     headers : {
        'content-type' : 'application/json'
     },
     body : JSON.stringify(userPost)
 })
   .then(res=>res.json())
   .then(data=>{
    console.log(data);
   })
}

}
    return(
<div className="tweetBox">
    <form onSubmit={handleTweet}>
<div className="tweetBox__input">
                <Avatar src={useProfilePic}/>
                <input
                    type="text"
                    placeholder="What's happening?"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    required
                />
            </div>
            
            <div className="imageIcon_tweetButton">
                <label htmlFor='image' className="imageIcon">
                    {
                        isLoading ? <p>Uploading Images</p> : <p>{imageURL ? 'image uploaded':<AddPhotoAlternateOutlinedIcon />}</p>
                    }
                </label>
                <input
                    type="file"
                    id='image'
                    className="imageInput"
                    onChange={handleUploadImage}
                />
                <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
            </div>
            </form>
</div>
    )
}
export default TweetBox;