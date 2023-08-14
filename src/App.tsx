import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from './pages/home';
import ResetCSS from './style/resetCSS';

function App() {
  return (
    <>
      <ResetCSS />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;