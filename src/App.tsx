import React from 'react';
import './App.css';
import RestApiPage from './components/RestApiPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register'

const hrefLink: string = 'https://sschmi129raspi.duckdns.org';

function App() {
  return (
    <div className="App flex sm:h-screen sm:w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login hrefLink={hrefLink}/>} />
          <Route path="/register" element={<Register hrefLink={hrefLink}/>} />
          <Route path="/restapipage" element={<RestApiPage hrefLink={hrefLink}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
