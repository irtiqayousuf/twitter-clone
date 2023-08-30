import React, { useState } from 'react';
import './Sidebar.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import SidebarOptions from './SidebarOptions';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreIcon from '@mui/icons-material/More';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import DoneIcon from '@mui/icons-material/Done';
import ListIcon from '@mui/icons-material/List';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import CustomLink from './CustomLink';



const Sidebar = ({handleLogout , user}) => {
const [anchorE1,setAnchorE1] = useState(null); 
const openMenu =Boolean(anchorE1);
const [loggedInUser] = useLoggedInUser();

const useProfilePic = loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000"


const handleClick = e => {
    setAnchorE1(e.currentTarget);
}

const handleClose = e => {
    setAnchorE1(null);
}

const result = user[0]?.email?.split('@')[0];
        return(
            <div className='sidebar'>
                <TwitterIcon
                className='sidebar__twitterIcon'/>
                <CustomLink to="/home/feed"><SidebarOptions active Icon={HomeIcon} text='Home'/></CustomLink>                                
                <CustomLink to="/home/explore"><SidebarOptions active Icon={SearchIcon} text='Explore' /></CustomLink>
                <CustomLink to="/home/notifications"><SidebarOptions active Icon={NotificationsIcon} text='Notifications' /></CustomLink>
                <CustomLink to="/home/messages"><SidebarOptions active Icon={MailOutlineIcon} text='Messages' /></CustomLink>
                <CustomLink to="/home/bookmarks"><SidebarOptions active Icon={BookmarkBorderIcon} text='Bookmarks' /></CustomLink>
                <CustomLink to="/home/lists"><SidebarOptions active Icon={ListAltIcon} text='Lists' /></CustomLink>
                <CustomLink to="/home/profile"><SidebarOptions active Icon={PermIdentityIcon} text='Profile' /></CustomLink>
                <CustomLink to="/home/more"><SidebarOptions active Icon={MoreIcon} text='More' /></CustomLink>
                 <Button
                 variant='outlined'
                 className='sidebar__tweet'>Tweet</Button>
                 <div className='Profile__info'>
                    <Avatar src={useProfilePic} />
                    <div className='user__info'>
                    <h4>
                        {
                        loggedInUser[0]?.name?loggedInUser[0]?.name: user && user[0]?.displayName
}
                    </h4>
                    <h5>@{result}</h5>
                 </div>
                 <IconButton size='small' 
                 sx={ {ml: 2}}
                 aria-controls={openMenu ? " basic-menu" : undefined }
                 aria-haspopup="true"
                 aria-expanded={openMenu ? " basic-menu" : undefined }
                 onClick={handleClick}
                 ><MoreHorizIcon/></IconButton>
                 <Menu id='basic-menu' anchorEl={anchorE1} open={openMenu} onClick={handleClose} onClose={handleClose}> 
                    <MenuItem className='Profile-info1'>
                    <Avatar src={useProfilePic} />                    
                    <div className='user__info subUser__info'>
                    <div>
                    <h4>
                        {
                        loggedInUser[0]?.name?loggedInUser[0]?.name: user && user[0]?.displayName
}
                    </h4>
                    <h5>@{result}</h5>
                    </div>
                    <ListItemIcon className='done_icon'><DoneIcon/></ListItemIcon>
                    </div>
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
                    <MenuItem onClick={handleLogout}>Log out @irtiqa_yousuf</MenuItem>
                 </Menu>
               </div>
            </div>
        )
    }

export default Sidebar;