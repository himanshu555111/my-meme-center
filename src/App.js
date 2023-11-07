import Navbar from './navbar/navbar';
import Images from './pages/images';
import CreateOwnImage from './pages/create-own-image';
import MyDownloads from './pages/my-downloads';
import InsideFolder from './pages/inside-folder';
import Profile from './pages/profile';
import UploadMedia from './pages/upload-media';
import LogIn from './pages/login';
import Register from './pages/register';
import NotFound from './pages/not-found';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';



function App() {
  const drawerToggleState = useSelector((state) => state.drawer.toggle_drawer);
  // const folderParamId = useSelector((state) => state.folder.folder_param_id);
  // console.log(folderParamId,'folderParamId');
  const location = useLocation();

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  console.log(isLoggedIn,'524')

  useEffect(() => {
    if (!isLoggedIn || isLoggedIn === 'false') {
      navigate('/login')
    } else {
      // navigate('/profile')
    }
  }, [isLoggedIn])

  const mt = (location.pathname === '/login' || location.pathname === '/register') ? 'mt-[0px] ml-[0px]' : 'mt-[4rem] ml-[200px]';

  return (
    <div className="App">
      {isLoggedIn === "true" ? <Navbar /> : null}
      <CssBaseline />
      <>
        <main className={!drawerToggleState ? mt : 'mt-[4rem] ml-[4rem]'}>
          <Routes>
            {isLoggedIn === "true" ? <Route path="/images/vegetarian" element={<Images />}></Route> : null}
            {isLoggedIn === "true" ? <Route path="/mydashboard/mydownloads" element={<MyDownloads />}></Route> : null}
            {isLoggedIn === "true" ? <Route path="/mydashboard/mydownloads/:id" element={<InsideFolder />}></Route> : null}
            {isLoggedIn === "true" ? <Route path="/profile" element={<Profile />}></Route> : null}
            {isLoggedIn === "true" ? <Route path="/upload-media" element={<UploadMedia />}></Route> : null}   
            {isLoggedIn === "true" ? <Route path="/create/newimage" element={<CreateOwnImage />}></Route> : null}  
               
            
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </main>
      </>
    </div>
  );
}

export default App;
