import Navbar from "../components/NavBar"
import Footer from "../components/footer";
import imigration from '../assets/imigration-Guide.png'
export default function AboutUs() {
  return (
    <div className="w-full h-80 bg-[#a3b18a] flex flex-col">
      <Navbar />
      <div className="flex mt-[10%] flex-1 flex-col items-center  ">
        <h1 className="text-2xl mb-5 font-medium">About Us</h1>
        <img className = "h-[400px] w-[600px]"src={imigration} alt="" />
        <p className="w-xl font-light text-md my-8">At MoveWise, we understand that moving abroad is one of the biggest decisions in life. With Pakistan facing economic challenges, inflation, and limited career growth opportunities, many individuals and families are seeking better prospects overseas. However, navigating the complexities of migration—understanding visa requirements, job markets, education options, and cost of living—can be overwhelming. That’s where we come in.
Our mission is to provide Pakistanis with accurate, up-to-date, and personalized guidance on choosing the right country based on their budget, skills, career goals, and lifestyle preferences. <br  /> <br />Whether you’re a student looking for scholarships, a professional searching for high-demand jobs, or a family aiming for a better quality of life, we simplify the migration process for you.
Through expert insights, AI-powered recommendations, country comparisons, and a supportive community, we empower you to make informed decisions about your future. Your journey to a better life starts here—let us guide you every step of the way. 
<br /> <br />At MoveWise, we believe that everyone deserves a chance at a brighter future. That’s why we are committed to making migration information accessible, transparent, and tailored to your needs. Our platform offers in-depth visa guides, job market trends, education opportunities, and cost-of-living breakdowns for various countries. We also provide a community forum where migrants and experts share real-life experiences, helping you avoid common pitfalls and make smarter choices.
Whether you dream of studying in Europe, working in Canada, or settling with your family in Australia, we are here to simplify your journey and connect you with the right opportunities. Your future begins today—let’s take the first step together!
</p>
      </div>
      <footer>
         <Footer />
      </footer>
    </div>
  );
}
