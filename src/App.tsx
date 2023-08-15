import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import Profile from './pages/profile';
import ResetCSS from './style/resetCSS';

function App() {
  return (
    <>
      <ResetCSS />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search/:searchText" element={<Search/>}/>
          <Route path='/profile/:login' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;