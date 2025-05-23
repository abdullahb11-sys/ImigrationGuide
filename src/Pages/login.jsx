import LoginImage from '../assets/Login.png';
import { Link } from 'react-router-dom'

export default function Login(){

 return(

    <div className="flex flex-wrap justify-center items-center h-screen w-full md:p-10 bg-[#e7ecef]">
        <div className="bg-white flex border-1 border-[#a3b18a] h-full w-3/4 z-10 ">
            <div className="relative hidden md:block sm:w-1/3">
            <img className="absolute   h-full w-full" src={LoginImage} alt="Login Image" />
            </div>
            <div className=" p-8 h-full w-full sm:w-2/3 flex flex-col">
            <h1 className="sm:ml-7 mt-10 text-5xl self-center font-bold">Welcome Back</h1>
            <p className='sm:ml-8 ml-1 mt-2 text-sm self-center text-grey'>Please Enter Your Details</p>
            <form className="mt-4 sm:ml-7 ml-1  space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-2/3 p-3 border-b border-gray-300  transition  duration-300 focus:ring-2 focus:ring-[#e63946] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-2/3 p-3 border-b  transition  duration-300  border-gray-300  focus:ring-2 focus:ring-[#e63946] focus:outline-none"
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
            className="w-2/3   p-3 bg-[#a3b18a] text-white rounded-lg  cursor-pointer"
          >
            Login
          </button>
          <p>Don't have an Account?<Link  to="/signup"> <span className='text-blue-800'>signup Now</span></Link></p>
        </form>
            </div>
            
        </div>
    </div>

 );
}