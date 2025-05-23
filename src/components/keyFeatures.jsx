import AI from '../assets/AI.png'
import JOB from '../assets/job.png'
import VISA from '../assets/Visa.png'
import Comm from '../assets/community.png'

export default function KeyFeatures(){
    const keyFeatures = [
        {
            title: "AI-Recommendations",
            description: "Find the best country for you with our AI-based recommendation system.",
            icon: AI
        },
        {
            title: "Real-Time Visa Updates",
            description: "Stay informed with the latest visa policies and immigration news.",
            icon: VISA
        },
        {
            title: "Job & Education Listings",
            description: "Discover job opportunities and top universities for your career growth.",
            icon: JOB
        },
        {
            title: "Community Support",
            description: "Connect with fellow migrants and get guidance from experienced individuals.",
            icon: Comm
        }
    ];
    
    return(

        <div className="h-full w-full bg-[#f8f9fa]  ">
             <hr className="max-w-6xl w-full border-gray-300 my-4 mx-auto" />
            <div className="p-7 flex md:flex-row flex-col">
            

            <div className="md:w-2/5  w-full flex flex-col items-center justify-center "> 
            <h2 className=" ml-5 text-3xl font-medium text-[#588157]">Our Key Features: Simplifying Your Immigration Journey!</h2>
            <p className=" ml-5 mt-4 text-md font-md text-[#a3b18a]"> From AI-powered country recommendations to real-time visa updates, we provide everything you need to make informed decisions. Explore job and education opportunities, stay updated on immigration policies, and connect with a supportive community—all in one place!</p>
            </div>
            <div className="w-3/5 grid ml-10 md:grid-cols-2 max-w-xl  gap-4">
              { keyFeatures.map((feature, index) => (
                <div key = {index} className="flex  bg-white flex-col p-4 rounded-xl shadow-md transition cursor-pointer hover:bg-[#588157] hover:text-white  " >
                    <img className=' w-[60px] h-[60px] object-cover  ' src={feature.icon} alt="" />
                      <div className='hover:-translate-y-4 transition duration-300'>
                    <h3 className="ml-2 text-md font-bold ">{feature.title} </h3>
                    <p className="ml-2 mt-5 text-sm font-medium">{feature.description}</p>
                    </div>

                </div>

              ))}
            </div>
            </div>
        </div>
    )

    
}