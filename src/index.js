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
import WelcomeMsg from './pages/WelcomeMsg';
import Individualchat from './pages/Individualchat';
import Support from './pages/Support';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/eMessengerWebPortal">
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='/' element={<SignIn />} />
        <Route path='/welcome-message' element={<WelcomeMsg />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/reply/:msg_id/:sended_msg_id' element={<Reply />} />
        <Route path='/chat/GROUPCHAT/:msg_id/:sender_id' element={<Chat />} />
        <Route path='/chat/INDIVIDUALCHAT/:msg_id/:sender_id' element={<Individualchat />} />
        <Route path='/support' element={<Support />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

