import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import Home from './pages/home';
import Search from './pages/search';
import Profile from './pages/profile';
import History from './pages/history';
import About from './pages/about';

import ResetCSS from './style/resetCSS';

const App: React.FC = () => {
  return (
    <>
      <ResetCSS />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchText" element={<Search />} />
          <Route path='/profile/:login' element={<Profile />} />
          <Route path='/history' element={<History />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;