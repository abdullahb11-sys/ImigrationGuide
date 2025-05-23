import videoBg from "../assets/background.mp4";
import OurStory from "../components/OurStory";
import NavBar from "../components/NavBar";
import FeaturedCountries from "../components/countrycards";
import Footer from "../components/footer";
import BlogsAndPosts from "../components/blog";
import KeyFeatures from "../components/keyFeatures";
import SidebarMenu from "../components/sidebar"; // Import Sidebar

export default function HomePage() {
  return (
    <div className="bg-[#f8f9fa] h-full flex flex-col ">
      {/* Sidebar */}

      <header className="h-screen mb-10 relative">
        <NavBar />
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={videoBg}
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute flex flex-col right-50 bottom-10 sm:right-10">
          
          <button className="transition-all border cursor-pointer   duration-300 hover:-translate-y-1 hover:rounded-xl text-white text-lg font-semibold py-3 px-6">
            Get Started
          </button>
        </div>
      </header>

      <OurStory />
      <KeyFeatures />
      <FeaturedCountries />
      <BlogsAndPosts />
      <footer>
         <Footer />
      </footer>
    </div>
  );
}
