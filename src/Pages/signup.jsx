import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignImage from '../assets/signup.png';

export default function Signup(){
  const [formData, setFormData] = useState({
    username: '',
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
      await axios.post(`http://localhost:5000/api/auth/register`, formData);
      // After successful registration, automatically log in
      const loginResponse = await axios.post(`http://localhost:5000/api/auth/login`, {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('userData', JSON.stringify(loginResponse.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <div className="flex flex-wrap justify-center items-center h-screen w-full md:p-10 bg-[#e7ecef]">
        <div className="bg-white flex border-1 border-[#a3b18a] h-full w-3/4 z-10 ">
            <div className="relative hidden md:block sm:w-1/3">
            <img className="absolute   h-full w-full" src={SignImage} alt="Login Image" />
            </div>
            <div className=" p-8 h-full w-full sm:w-2/3 flex flex-col">
            <h1 className=" self-center text-5xl font-bold">Hi there!</h1>
            <p className=' text-sm self-center text-grey'>Take the first step towards your dream Destination</p>
            
            {error && (
              <div className="mt-4 sm:ml-7 ml-1 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 sm:ml-7 ml-1  space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 w-2/3 p-2 border-b border-gray-300  transition  duration-300 focus:ring-1 focus:ring-[#a3b18a] focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-2/3 p-3 border-b border-gray-300  transition  duration-300 focus:ring-1 focus:ring-[#a3b18a] focus:outline-none"
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
              className="mt-1 w-2/3 p-3 border-b  transition  duration-300  border-gray-300  focus:ring-1 focus:ring-[#a3b18a] focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
         
          <button
            type="submit"
            disabled={isLoading}
            className="w-2/3 p-3 bg-[#a3b18a] text-white rounded-lg cursor-pointer hover:bg-[#588157] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <p>Already Have an Account?<Link  to="/login"> <span className='text-blue-800'>Login Now</span></Link></p>
        </form>
            </div>
            
        </div>
    </div>
  );
}