import { useState } from 'react';
import Homepage from './Pages/Homepage';
import Login from './Pages/login';
import Signup from './Pages/signup';
import AboutUs from './Pages/about';
import VisaGuide from './Pages/visaGuide';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
      path: "/aboutUs",
      element: <AboutUs />,
    },
    {
      path: "/visaguide",
      element: <VisaGuide />,
    },
  ]);
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
