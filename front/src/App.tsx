import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/AppToolbar/AppToolbar';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import './App.css';
import Photos from './containers/Photos/Photos';
import PhotosUser from './containers/PhotosUser/PhotosUser';

const App = () => {
  return (
    <>
      <AppToolbar/>
      <Routes>
        <Route path="/" element={<Photos/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/users/:id" element={<PhotosUser/>}/>
      </Routes>
    </>
  );
}

export default App;
