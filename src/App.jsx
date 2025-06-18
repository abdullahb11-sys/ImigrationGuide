import { useState } from 'react';
import Homepage from './Pages/Homepage';
import Login from './Pages/login';
import Signup from './Pages/signup';
import AboutUs from './Pages/about';
import CountryComparison from './Pages/CountryComparison';
import JobsEducation from './Pages/JobsEducation';
import NewsAndBlogs from './Pages/NewsAndBlogs';
import Profile from './Pages/Profile';
import Community from './Pages/Community';
import UserProfile from './Pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from './Pages/ContactUs';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />, 
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/community",
      element: <Community />,
    },
    {
      path: "/user/:userId",
      element: <UserProfile />,
    },
    {
      path: "/aboutUs",
      element: <AboutUs />,
    },
    {
      path: "/compare",
      element: <CountryComparison />,
    },
    {
      path: "/jobs-education",
      element: <JobsEducation />,
    },
   
    {
      path: "/news",
      element: <NewsAndBlogs />
    },
    {
      path: "/contact",
      element: <ContactUs />,
    },
  ]);
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
