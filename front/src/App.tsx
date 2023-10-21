import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/AppToolbar/AppToolbar';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Main from './containers/Main/Main';
import './App.css';

const App = () => {
  return (
    <>
      <AppToolbar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
