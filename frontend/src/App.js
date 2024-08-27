import './App.css';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/authContext";
import Navbar from './components/header/navbar';
import PageLoader from './components/page_loader/page_loader';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library

// Lazy load components
const Home = lazy(() => import('./components/home/home'));
const About = lazy(() => import('./components/home/about'));
const Login = lazy(() => import('./components/auth/login'));
const Register = lazy(() => import('./components/auth/register'));
const Profile = lazy(() => import('./components/Users/profile'));
const Notes = lazy(() => import('./components/Notes/Notes'));
const Dashboard = lazy(() => import('./components/dashboard/dashboard'));
const NewManageUsers = lazy(() => import('./components/admin/Manage/NewManageUsers'));
const EmailLog = lazy(() => import('./components/admin/Manage/ManageEmailLog'));
const RaiseTicket = lazy(() => import('./components/ticket/Ticket'));

export const AppWrapper = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      easing: 'ease-in-out', // Animation easing
      once: true, // Whether animation should happen only once or every time you scroll up/down
    });
  }, []);
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <PageLoader />} {/* Show loader while loading */}
      {!loading && (
        <AuthProvider>
          <Router>
            <Navbar />
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>
          </Router>
        </AuthProvider>
      )}
    </>
  );
}
