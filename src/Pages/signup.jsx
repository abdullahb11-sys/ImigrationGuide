
import { Link } from 'react-router-dom'

import SignImage from '../assets/signup.png';
export default function Signup(){

 return(

    <div className="flex flex-wrap justify-center items-center h-screen w-full md:p-10 bg-[#e7ecef]">
        <div className="bg-white flex border-1 border-[#a3b18a] h-full w-3/4 z-10 ">
            <div className="relative hidden md:block sm:w-1/3">
            <img className="absolute   h-full w-full" src={SignImage} alt="Login Image" />
            </div>
            <div className=" p-8 h-full w-full sm:w-2/3 flex flex-col">
            <h1 className=" self-center text-5xl font-bold">Hi there!</h1>
            <p className=' text-sm self-center text-grey'>Take the first step towards your dream Destination</p>
            <form className="mt-4 sm:ml-7 ml-1  space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 w-2/3 p-2 border-b border-gray-300  transition  duration-300 focus:ring-1 focus:ring-[#a3b18a] focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-2/3 p-3 border-b border-gray-300  transition  duration-300 focus:ring-1 focus:ring-[#a3b18a] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-2/3 p-3 border-b  transition  duration-300  border-gray-300  focus:ring-1 focus:ring-[#a3b18a] focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
         
          <button
            type="submit"
            className="w-2/3   p-3 bg-[#a3b18a] text-white rounded-lg  cursor-pointer"
          >
            Login
          </button>
          <p>Already Have an Account?<Link  to="/login"> <span className='text-blue-800'>Login Now</span></Link></p>
        </form>
            </div>
            
        </div>
    </div>

 );
}