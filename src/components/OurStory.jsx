import { Link } from "react-router-dom";


export default function OurStory(){
    return(
        <div className="w-full h-full bg-[#f8f9fa] flex flex-col">
            <hr className="max-w-6xl w-full border-gray-300 my-4 mx-auto" />
            <div>
              
              <h1 className="md:ml-13  text-md font-medium text-[#588157]">Our Story</h1>
              
              <p className="mt-8 md:ml-13  text-[#a3b18a] max-w-2xl mx-auto text-4xl font-extralight">At MoveWise, we help Pakistanis find the best country to migrate to based on their budget, skills, and goals. With rising challenges at home, we simplify visas, jobs, and education options—making your migration journey smooth and informed. Your future starts here!  </p>
              </div>
              <div className="w-full flex flex-col ">
                <div className="ml-auto hidden md:block  max-w-md text-center">
                    <p className=" text-xl text-[#a3b18a] font-extralight">Learn more about our mission and how we can guide you toward a brighter future!</p>
                </div>
                <Link to = "/aboutUs">
                <button class="px-6 py-2 my-3 cursor-pointer max-w-32 md:ml-[80%] ml-[60%] text-center text-[#588157] bg-none border border-[#588157]  transition-all duration-300 ease-in-out hover:rounded-3xl focus:outline-none focus:ring">
    About Us
</button>
</Link>
            </div>
</div>
    );

}