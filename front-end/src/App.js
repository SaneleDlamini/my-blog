import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import { Route, Redirect, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Nav from './components/Nav';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import Post from './components/Post';
import MyPosts from './components/MyPosts';
import CreatePost from './components/CreatePost';
import Users from './components/Users';
import UpdatePost from './components/UpdatePost';
import UpdateUser from './components/UpdateUser';
import PasswordReset from './components/PasswordReset';
import NewPassword from './components/NewPassword';
import PageNotFound from './components/PageNotFound';
import { login } from './features/authSlice';

function App() {

     const navigate = useNavigate();
     const auth = useSelector(state => state.auth);
     const dispatch = useDispatch();

     useEffect(() => {
        const isLoggedIn = localStorage.getItem("token");
        if(isLoggedIn){
          dispatch(login());
        }
     },[dispatch])

   return (
      <div>
         <Nav />
         <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/auth/password-reset" element={<PasswordReset />} />
            <Route path="/auth/new-password" element={<NewPassword />} />
            <Route path="*" element={<PageNotFound />} />
            
            {auth && 
            <>
               <Route path="/post/update/:id" element={<UpdatePost />} />
               <Route path="/user/update/:id" element={<UpdateUser />} />
               <Route path="/my-post" element={<MyPosts />} />
               <Route path="/add-post" element={<CreatePost />} />
               <Route path="/users" element={<Users />} />
            </>
         }
         </Routes>
         <Footer />
      </div>
   )
}

export default App;
