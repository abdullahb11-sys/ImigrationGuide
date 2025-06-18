import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginImage from '../assets/Login.png';

export default function Login(){
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <div className="flex flex-wrap justify-center items-center h-screen w-full md:p-10 bg-[#e7ecef]">
        <div className="bg-white flex border-1 border-[#a3b18a] h-full w-3/4 z-10 ">
            <div className="relative hidden md:block sm:w-1/3">
            <img className="absolute   h-full w-full" src={LoginImage} alt="Login Image" />
            </div>
            <div className=" p-8 h-full w-full sm:w-2/3 flex flex-col">
            <h1 className="sm:ml-7 mt-10 text-5xl self-center font-bold">Welcome Back</h1>
            <p className='sm:ml-8 ml-1 mt-2 text-sm self-center text-grey'>Please Enter Your Details</p>
            
            {error && (
              <div className="mt-4 sm:ml-7 ml-1 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 sm:ml-7 ml-1  space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-2/3 p-3 border-b border-gray-300  transition  duration-300 focus:ring-2 focus:ring-[#a3b18a] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-2/3 p-3 border-b  transition  duration-300  border-gray-300  focus:ring-2 focus:ring-[#a3b18a] focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-[#e63946]" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-black hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-2/3 p-3 bg-[#a3b18a] text-white rounded-lg cursor-pointer hover:bg-[#588157] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p>Don't have an Account?<Link  to="/signup"> <span className='text-blue-800'>signup Now</span></Link></p>
        </form>
            </div>
            
        </div>
    </div>
  );
}