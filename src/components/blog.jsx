import { useState, useEffect } from 'react';
import BlogImg from '../assets/Blog.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function BlogsAndPosts() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/news/immigration-news?page=1&limit=6`);
                const data = response.data;
                
                if (data.status === 'success') {
                    setNews(data.data);
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to load news');
                // Use fallback data if API fails
                setNews(fallbackPosts);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Fallback posts in case the API fails
    const fallbackPosts = [
        {
            title: "Canada Eases Immigration Policies for 2025",
            description: "The Canadian government announced new policies...",
            link: "/news/canada-immigration-update",
            publishedAt: "March 8, 2025",
        },
        {
            title: "Australia Introduces New Work Visa",
            description: "Australia is launching a new work visa category...",
            link: "/news/australia-work-visa",
            publishedAt: "March 6, 2025",
        },
        {
            title: "Germany Extends Job Seeker Visa Validity",
            description: "Germany has extended the validity of its Job Seeker Visa...",
            link: "/news/germany-job-seeker-visa",
            publishedAt: "March 5, 2025",
        },
        {
            title: "UK Announces Post-Study Work Visa Changes",
            description: "The UK has modified its post-study work visa policies...",
            link: "/news/uk-post-study-work-visa",
            publishedAt: "March 4, 2025",
        },
        {
            title: "USA to Increase H-1B Visa Quota",
            description: "The United States is set to increase the annual H-1B visa quota...",
            link: "/news/usa-h1b-visa-quota",
            publishedAt: "March 3, 2025",
        },
        {
            title: "New Zealand Offers More PR Pathways",
            description: "New Zealand has introduced new permanent residency options...",
            link: "/news/newzealand-pr-pathways",
            publishedAt: "March 2, 2025",
        },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Display loading skeleton while fetching data
    if (loading) {
        return (
            <div className="h-full w-full bg-[#f8f9fa]">
                <hr className="max-w-6xl w-full border-gray-300 my-4 mx-auto" />
                <h1 className="text-3xl font-bold text-center mb-4 text-[#588157]">Blogs & Articles</h1>
                <div className="flex md:flex-row flex-col">
                    <div className="h-full w-full md:w-1/2 p-8">
                        <div className="animate-pulse bg-gray-200 h-64 w-full rounded-lg"></div>
                    </div>
                    <div className="h-full w-full md:w-1/2 grid grid-rows-4 gap-4 mt-6">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                <hr className="mt-4" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const displayNews = error ? fallbackPosts : news;

    return (
        <div className="h-full w-full bg-[#f8f9fa]">
            <hr className="max-w-6xl w-full border-gray-300 my-4 mx-auto" />
            <h1 className="text-3xl font-bold text-center mb-4 text-[#588157]">Blogs & Articles</h1>
            <div className="flex md:flex-row flex-col">
                <div className="h-full w-full md:w-1/2 p-8">
                    <img src={BlogImg} alt="Blog" className="w-full h-auto object-cover rounded-lg shadow-lg" />
                </div>
                <div className="h-full w-full md:w-1/2 grid grid-rows-4 gap-4 mt-6">
                    {displayNews.slice(0, 4).map((post, index) => (
                        <Link 
                            key={index}
                            to={post.url || post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col cursor-pointer transition duration-300 hover:-translate-y-1 group"
                        >
                            <h2 className="text-lg font-medium inline group-hover:text-[#588157] transition-colors duration-200">
                                {post.title}
                            </h2>
                            <p className="mb-3 text-sm text-gray-500">
                                {formatDate(post.publishedAt)}
                            </p>
                            <p className="font-light text-md line-clamp-2">
                                {post.description}
                            </p>
                            <hr className="mt-4" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* View All News Link */}
            <div className="text-center mt-8 mb-12">
                <Link
                    to="/news"
                    className="inline-flex items-center px-6 py-2 rounded-lg bg-[#588157] text-white font-medium hover:bg-[#476146] transition-all duration-300 transform hover:-translate-y-1"
                >
                    View All News
                    <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
}