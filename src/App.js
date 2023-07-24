import React from "react";
import Login from "./components/login";
import EditProfile from "./components/editProfile";
import Profile from "./components/profile";
import SignUp from "./components/signUp";
import { Route, Routes, Navigate} from "react-router-dom";
import Navbar from "./components/navbar";
import SuccessMessage from "./components/successMessage"; 
import Footer from "./components/footer";


function App() {
  console.log("hello");
  return (
    <div className="app">
      
    <div className="app-contents">
            

      <Routes>
        <Route
        path="/"
        element={<Login/>}
        />
        <Route
        path="sign-up"
        element={<SignUp/>}
        />
        <Route
        path="profile"
        element={<Profile/>}
        />
        <Route
        path="profile/edit-profile"
        exact element={<EditProfile/>}
        />
        <Route
        path="sign-up/Success-message"
        element={<SuccessMessage/>}
        />
        {/* //try */}
        <Route
        path="edit"
        exact element={<Navigate to='edit-profile'/>}
        />
      </Routes>
    </div>
    <Footer/>
    </div>
  );
}
export default App;
