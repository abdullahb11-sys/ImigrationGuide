import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import CreatePostForm from '../components/CreatePostForm';
import PostFilters from '../components/PostFilters';
import Pagination from '../components/Pagination';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    useEffect(() => {
        fetchPosts();
    }, [currentPage, selectedCategory, searchQuery]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage,
                limit: 10,
                category: selectedCategory,
                search: searchQuery
            });

            const response = await axios.get(`http://localhost:5000/api/posts?${params}`);
            setPosts(response.data.posts);
            setTotalPages(response.data.totalPages);
            setTotalPosts(response.data.totalPosts);
        } catch (error) {
            // Removed console.log for production
        } finally {
            setLoading(false);
        }
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const handlePostUpdate = (postId, updatedPost) => {
        setPosts(posts.map(post => 
            post._id === postId ? updatedPost : post
        ));
    };

    const handlePostDelete = (postId) => {
        setPosts(posts.filter(post => post._id !== postId));
    };

    const handleSearchSubmit = () => {
        setCurrentPage(1);
        fetchPosts();
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#e7ecef] flex items-center justify-center">
                <div className="text-[#588157] text-xl">Loading community posts...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#e7ecef]">
            <NavBar />
            <div className="pt-20 px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-[#588157]">Community</h1>
                                <p className="text-gray-600 mt-1">
                                    Connect with fellow immigrants and share your experiences
                                </p>
                            </div>
                            <button
                                onClick={() => setShowCreateForm(!showCreateForm)}
                                className="px-4 py-2 bg-[#a3b18a] text-white rounded-lg hover:bg-[#588157] transition-colors duration-300"
                            >
                                {showCreateForm ? 'Cancel' : 'Create Post'}
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <span>{totalPosts} total posts</span>
                            <span>{posts.length} posts on this page</span>
                        </div>
                    </div>

                    {/* Filters */}
                    <PostFilters
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onSearchSubmit={handleSearchSubmit}
                    />

                    {/* Create Post Form */}
                    {showCreateForm && (
                        <div className="mb-6">
                            <CreatePostForm
                                onPostCreated={handlePostCreated}
                                onCancel={() => setShowCreateForm(false)}
                            />
                        </div>
                    )}

                    {/* Posts */}
                    <div className="space-y-6">
                        {posts.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                                <p className="text-gray-600 mb-4">
                                    {searchQuery || selectedCategory !== 'all' 
                                        ? 'Try adjusting your search or filters'
                                        : 'Be the first to create a post!'
                                    }
                                </p>
                                {!showCreateForm && (
                                    <button
                                        onClick={() => setShowCreateForm(true)}
                                        className="px-4 py-2 bg-[#a3b18a] text-white rounded-lg hover:bg-[#588157] transition-colors duration-300"
                                    >
                                        Create First Post
                                    </button>
                                )}
                            </div>
                        ) : (
                            posts.map(post => (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                    currentUser={userData}
                                    onUpdate={handlePostUpdate}
                                    onDelete={handlePostDelete}
                                />
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Community; 