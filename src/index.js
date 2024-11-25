import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Reply from './pages/Reply';
import Chat from './pages/Chat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/eMessengerWebPortal/">
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />}/>
        <Route path='/reply' element={<Reply />}/>
        <Route path='/chat' element={<Chat/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

