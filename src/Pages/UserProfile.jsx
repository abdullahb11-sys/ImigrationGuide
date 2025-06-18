import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

    useEffect(() => {
        fetchUserProfile();
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchUserPosts();
        }
    }, [userId, currentPage]);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPosts = async () => {
        try {
            setPostsLoading(true);
            const params = new URLSearchParams({
                page: currentPage,
                limit: 10
            });

            const response = await axios.get(`http://localhost:5000/api/posts/user/${userId}?${params}`);
            setPosts(response.data.posts);
            setTotalPages(response.data.totalPages);
            setTotalPosts(response.data.totalPosts);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        } finally {
            setPostsLoading(false);
        }
    };

    const handlePostUpdate = (postId, updatedPost) => {
        setPosts(posts.map(post => 
            post._id === postId ? updatedPost : post
        ));
    };

    const handlePostDelete = (postId) => {
        setPosts(posts.filter(post => post._id !== postId));
        setTotalPosts(prev => prev - 1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#e7ecef] flex items-center justify-center">
                <div className="text-[#588157] text-xl">Loading user profile...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-[#e7ecef]">
                <NavBar />
                <div className="pt-20 px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            <div className="text-6xl mb-4">👤</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">User not found</h3>
                            <p className="text-gray-600">The user you're looking for doesn't exist.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#e7ecef]">
            <NavBar />
            <div className="pt-20 px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* User Profile Header */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                            {/* Profile Picture */}
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#a3b18a] flex items-center justify-center">
                                {user.profilePicture ? (
                                    <img 
                                        src={`http://localhost:5000${user.profilePicture}`} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#a3b18a] flex items-center justify-center text-white text-4xl font-bold">
                                        {user.name ? user.name.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-bold text-[#588157] mb-2">
                                    {user.name || user.username}
                                </h1>
                                <p className="text-gray-600 mb-4">
                                    Member since {formatDate(user.createdAt)}
                                </p>

                                {/* Immigration Preferences */}
                                {user.targetCountries && user.targetCountries.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Target Countries:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {user.targetCountries.map((country, index) => (
                                                <span key={index} className="px-3 py-1 bg-[#a3b18a] text-white text-sm rounded-full">
                                                    {country}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Additional Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    {user.visaType && (
                                        <div>
                                            <span className="font-semibold text-gray-700">Visa Type:</span>
                                            <span className="ml-2 text-gray-600 capitalize">
                                                {user.visaType.replace('_', ' ')}
                                            </span>
                                        </div>
                                    )}
                                    {user.educationLevel && (
                                        <div>
                                            <span className="font-semibold text-gray-700">Education:</span>
                                            <span className="ml-2 text-gray-600 capitalize">
                                                {user.educationLevel.replace('_', ' ')}
                                            </span>
                                        </div>
                                    )}
                                    {user.workExperience && (
                                        <div>
                                            <span className="font-semibold text-gray-700">Experience:</span>
                                            <span className="ml-2 text-gray-600 capitalize">
                                                {user.workExperience.replace('_', ' ')}
                                            </span>
                                        </div>
                                    )}
                                    {user.gender && (
                                        <div>
                                            <span className="font-semibold text-gray-700">Gender:</span>
                                            <span className="ml-2 text-gray-600 capitalize">
                                                {user.gender}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Posts Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#588157]">
                                Posts by {user.name || user.username}
                            </h2>
                            <div className="text-sm text-gray-600">
                                {totalPosts} total posts
                            </div>
                        </div>

                        {postsLoading ? (
                            <div className="text-center py-8">
                                <div className="text-[#588157] text-lg">Loading posts...</div>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                                <p className="text-gray-600">
                                    {user.name || user.username} hasn't created any posts yet.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-6">
                                    {posts.map(post => (
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                            currentUser={currentUser}
                                            onUpdate={handlePostUpdate}
                                            onDelete={handlePostDelete}
                                        />
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile; 