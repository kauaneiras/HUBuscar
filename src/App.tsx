//------------------------------------------ Imports ------------------------------------------//
import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
//------------------------------------------ Pages ------------------------------------------//
import Home from './pages/home';
import Search from './pages/search';
import Profile from './pages/profile';
import History from './pages/history';
//------------------------------------------ Styles ------------------------------------------//
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;