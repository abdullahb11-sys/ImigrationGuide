import Austrailia from '../assets/Austrailia.png';
import canada from '../assets/Canada.png'
import Germany from '../assets/Germany.png'
import America from '../assets/USA.png'
export default function FeaturedCountries(){

    const countries = [
        {
            name: "Canada",
            image: canada, 
            description: "A top choice for skilled workers with PR pathways.",
            link: "/country/canada"
        },
        {
            name: "Australia",
            image: Austrailia,
            description: "Great for students and skilled migrants.",
            link: "/country/australia"
        },
        {
            name: "Germany",
            image: Germany,
            description: "Offers free education and work visas.",
            link: "/country/germany"
        }
        ,
        {
            name: "USA",
            image: America,
            description: "Offers Quality education and Oportunities.",
            link: "/country/USA"
        }
        
         

    ];

    return(

        <div className=" w-full  bg-[#f8f9fa] " >
             <hr className="max-w-6xl w-full border-gray-300 my-4 mx-auto" />
             <h1 className="text-3xl font-bold text-center mb-8 text-[#588157]  ">Featured Countries</h1>
             <div className="max-w-6xl h-full mx-auto grid md:grid-cols-3 gap-8">
             {countries.map((country, index) => (
                   <div key={index} className="bg-white cursor-pointer shadow-lg rounded-lg p-5  text-center transition-transform duration-300 hover:-translate-y-2">
                    <h1 className="text-lg font-medium text-[#588157]">{country.name}</h1>
                    <div className="relative  ">
                    <img className = 'w-full h-full object-contain rounded-lg 'src={country.image} alt="" />
                    </div>
                   </div>

                
             ))}
                 </div>


        </div>
    )
}