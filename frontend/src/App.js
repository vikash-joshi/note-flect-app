import './App.css'
import React, { useEffect, useState } from 'react';
import Navbar from './components/header/navbar';
import Home from './components/home/home';
import About from './components/home/about';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider } from "./context/authContext";
import Profile from './components/Users/profile';
import Notes from './components/Notes/Notes';
import Dashboard from './components/dashboard/dashboard';
//import ManageUsers from './components/admin/Manage/Manageuser';
import RaiseTicket from './components/ticket/Ticket';
import NewManageUsers from './components/admin/Manage/NewManageUsers';
import EmailLog from './components/admin/Manage/ManageEmailLog';
import PageLoader from './components/page_loader/page_loader';

import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library

export const AppWrapper = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      easing: 'ease-in-out', // Animation easing
      once: true, // Whether animation should happen only once or every time you scroll up/down
    });
  }, []);
}



export default function App (){

// Initialize AOS
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetch data, wait for content to load)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);
  return(
<>
{loading && <PageLoader />} {/* Show loader while loading */}
{!loading && (
<AuthProvider>   
<Router>    
    <Navbar /> 
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ManageUsers" element={<NewManageUsers />} />
          <Route path="/EmailLog" element={<EmailLog />} />
          <Route path="/RaiseTicket" element={<RaiseTicket />} />
          
          
          
        </Routes>
        
        </Router>
        </AuthProvider> )}

</>)
}


