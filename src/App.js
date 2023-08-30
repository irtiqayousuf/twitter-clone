import logo from './logo.svg';
import './App.css';
import { Routes, Route ,BrowserRouter  } from "react-router-dom";
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import ProtectedRoute from './pages/ProtectedRoute';
import PageLoading from './pages/PageLoading';
import Home from './pages/Home';
import Explore from './pages/Explore/Explore';
import Feed from './pages/Feed/Feed';
import Notifications from './pages/Notifications/Notifications';
import Messages from './pages/Messages/Messages';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Profile from './pages/Profile/Profile';
import Lists from './pages/Lists/Lists';
import More from './pages/More/More';




function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <h1> Heloo From Irtiqa</h1> */}
       <BrowserRouter>
          <Routes>       
              <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}>
              <Route index element={<Feed/>}/>
              </Route>
              <Route path="/home" element={<Home/>}>
              <Route path="feed" element={<Feed/>}/>
              <Route path="explore" element={<Explore/>}/>
              <Route path="notifications" element={<Notifications/>}/>
              <Route path="messages" element={<Messages/>}/>
              <Route path="bookmarks" element={<Bookmarks/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="lists" element={<Lists/>}/>
              <Route path="more" element={<More/>}/>
              </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/page-loading" element={<PageLoading/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
