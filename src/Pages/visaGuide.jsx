import Navbar from "../components/NavBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import visaData from "../data/visaData";
import { Search } from "lucide-react"; // You can use this or any other icon lib

export default function VisaGuide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [triggeredQuery, setTriggeredQuery] = useState(""); // Holds the value after clicking search

  const filteredCountries = visaData.filter((country) =>
    country.country.toLowerCase().includes(triggeredQuery.toLowerCase())
  );

  const handleSearch = () => {
    setTriggeredQuery(searchQuery);
  };

  return (
    <div className="h-full w-full bg-[#f8f9fa] flex flex-col pt-20">
      <Navbar />
      <h1 className="text-center md:text-left  md:ml-[20%]  text-4xl text-[#588157] font-semibold mt-2">Explore Visa Options</h1>
      <div className="p-8 max-w-6xl  mx-auto w-full md:flex md:justify-center">
        <div className="flex w-full md:max-w-3xl">
          <input
            type="text"
            placeholder="Search by country"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                handleSearch();
              }
            }}
            className="flex-grow p-3 border rounded-l-lg"
          />
          <button
            onClick={handleSearch}
            className="bg-[#588157] cursor-pointer text-white px-4 rounded-r-lg"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

    </div>
  );
}
