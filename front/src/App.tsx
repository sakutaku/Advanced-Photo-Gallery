import React from "react";
import { Route, Routes } from "react-router-dom";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Photos from "./containers/Photos/Photos";
import PhotosUser from "./containers/PhotosUser/PhotosUser";
import AddPhoto from "./containers/AddPhoto/AddPhoto";
import { addInterceptors } from "./axiosApi";
import { store } from "./app/store";
import { useAppSelector } from "./app/hook";
import { selectUser } from "./store/usersSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";

addInterceptors(store);

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <AppToolbar />
      <Routes>
        <Route path="/" element={<Photos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id" element={<PhotosUser />} />
        <Route
          path="/add-photo"
          element={
            <ProtectedRoute isAllowed={!!user}>
              <AddPhoto />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
