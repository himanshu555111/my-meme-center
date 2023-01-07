import Navbar from './navbar/navbar';
import Images from './pages/images';
import MyDownloads from './pages/my-downloads';
import InsideFolder from './pages/inside-folder';



import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux';

function App() {
  const drawerToggleState = useSelector((state) => state.drawer.toggle_drawer);
  // const folderParamId = useSelector((state) => state.folder.folder_param_id);
  // console.log(folderParamId,'folderParamId');

  return (
    <div className="App">
      <Navbar />
      <CssBaseline />
      <Container maxWidth="xl">
        <main className={!drawerToggleState ? 'mt-[78px] ml-48' : 'mt-[78px] ml-[60px] ' }>
          <Routes>
            <Route path="/images/vegetarian" element={<Images />}></Route>
            <Route path="/mydashboard/mydownloads" element={<MyDownloads />}></Route>
            <Route path="/mydashboard/mydownloads/:id" element={<InsideFolder />}></Route>            
          </Routes>
        </main>
      </Container>
    </div>
  );
}

export default App;
