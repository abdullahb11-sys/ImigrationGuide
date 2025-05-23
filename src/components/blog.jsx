
import BlogImg from '../assets/Blog.png'
export default function BlogsAndPosts(){
    const posts = [
        {
            title: "Canada Eases Immigration Policies for 2025",
           
            description: "The Canadian government announced new policies...",
            link: "/news/canada-immigration-update",
            date: "March 8, 2025",
        },
        {
            title: "Australia Introduces New Work Visa",
            
            description: "Australia is launching a new work visa category...",
            link: "/news/australia-work-visa",
            date: "March 6, 2025",
        },
        {
            title: "Germany Extends Job Seeker Visa Validity",
           
            description: "Germany has extended the validity of its Job Seeker Visa...",
            link: "/news/germany-job-seeker-visa",
            date: "March 5, 2025",
        },
        {
            title: "UK Announces Post-Study Work Visa Changes",
           
            description: "The UK has modified its post-study work visa policies...",
            link: "/news/uk-post-study-work-visa",
            date: "March 4, 2025",
        },
        {
            title: "USA to Increase H-1B Visa Quota",
            
            description: "The United States is set to increase the annual H-1B visa quota...",
            link: "/news/usa-h1b-visa-quota",
            date: "March 3, 2025",
        },
        {
            title: "New Zealand Offers More PR Pathways",
           
            description: "New Zealand has introduced new permanent residency options...",
            link: "/news/newzealand-pr-pathways",
            date: "March 2, 2025",
        },
        
    ];
    
    return(

        <div className="h-full w-full  bg-[#f8f9fa] ">
             <hr className="max-w-6xl w-full border-gray-300 my-4 mx-auto" />

             <h1 className="text-3xl font-bold text-center mb-4 text-[#588157]"> Blogs & Articles </h1>

             <div className=" flex md:flex-row flex-col ">
                <div className="h-full w-full md:w-1/2 p-8">
                <img src={BlogImg} alt="" />
                </div>
                <div className="h-full w-full md:w-1/2 grid grid-rows-4 gap-4 mt-6">
                  {posts.map((post, index)=>(
                     <div key = {index} className='flex  flex-col cursor-pointer transition duration-300 hover:-translate-y-1 '>
                      <h2 className='text-lg font-medium inline '>{post.title}</h2>
                       <p className='mb-3'>{post.date}</p>
                      <p className='font-light text-md'>{post.description}</p>

                      <hr />
                       
                     </div>
                    
                  ) )}
                </div>

             </div>


        </div>
    )
    
}