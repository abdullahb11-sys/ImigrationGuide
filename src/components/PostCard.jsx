import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PostCard = ({ post, onUpdate, onDelete, currentUser }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isLiking, setIsLiking] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleLike = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        if (isLiking) return;
        setIsLiking(true);

        try {
            const response = await axios.post(`http://localhost:5000/api/posts/${post._id}/like`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            onUpdate(post._id, {
                ...post,
                likes: response.data.isLiked 
                    ? [...post.likes, currentUser.id]
                    : post.likes.filter(id => id !== currentUser.id)
            });
        } catch (error) {
            console.error('Error toggling like:', error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleComment = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        if (!commentText.trim() || isCommenting) return;
        setIsCommenting(true);

        try {
            const response = await axios.post(`http://localhost:5000/api/posts/${post._id}/comments`, {
                content: commentText
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            onUpdate(post._id, {
                ...post,
                comments: [...post.comments, response.data]
            });

            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setIsCommenting(false);
        }
    };

    const handleDeletePost = async () => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onDelete(post._id);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const isLiked = post.likes.includes(currentUser?.id);
    const canDelete = post.author._id === currentUser?.id;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <Link to={`/user/${post.author._id}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#a3b18a] flex items-center justify-center">
                            {post.author.profilePicture ? (
                                <img 
                                    src={`http://localhost:5000${post.author.profilePicture}`} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <span className="text-white font-bold">
                                    {post.author.name ? post.author.name.charAt(0).toUpperCase() : post.author.username.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900 hover:text-[#588157] transition-colors duration-300">
                                {post.author.name || post.author.username}
                            </div>
                            <div className="text-sm text-gray-500">
                                {formatDate(post.createdAt)}
                                {post.isEdited && <span className="ml-2 text-gray-400">(edited)</span>}
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-[#a3b18a] text-white text-xs rounded-full">
                        {post.category}
                    </span>
                    {canDelete && (
                        <button
                            onClick={handleDeletePost}
                            className="text-red-500 hover:text-red-700 transition-colors duration-300"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleLike}
                        disabled={isLiking}
                        className={`flex items-center space-x-1 ${
                            isLiked ? 'text-[#588157]' : 'text-gray-500'
                        } hover:text-[#588157] transition-colors duration-300 disabled:opacity-50`}
                    >
                        <span>❤️</span>
                        <span>{post.likes.length}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-[#588157] transition-colors duration-300"
                    >
                        <span>💬</span>
                        <span>{post.comments.length}</span>
                    </button>
                </div>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-4 border-t pt-4">
                    {/* Add Comment */}
                    <div className="mb-4">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            rows="2"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a3b18a] focus:outline-none"
                        />
                        <button
                            onClick={handleComment}
                            disabled={isCommenting || !commentText.trim()}
                            className="mt-2 px-4 py-2 bg-[#a3b18a] text-white rounded-lg hover:bg-[#588157] transition-colors duration-300 disabled:opacity-50"
                        >
                            {isCommenting ? 'Commenting...' : 'Comment'}
                        </button>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-3">
                        {post.comments.map((comment, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Link to={`/user/${comment.author._id}`} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                                        <div className="w-6 h-6 rounded-full overflow-hidden bg-[#a3b18a] flex items-center justify-center">
                                            {comment.author.profilePicture ? (
                                                <img 
                                                    src={`http://localhost:5000${comment.author.profilePicture}`} 
                                                    alt="Profile" 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : (
                                                <span className="text-white text-xs font-bold">
                                                    {comment.author.name ? comment.author.name.charAt(0).toUpperCase() : comment.author.username.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-semibold text-sm hover:text-[#588157] transition-colors duration-300">
                                            {comment.author.name || comment.author.username}
                                        </span>
                                    </Link>
                                    <span className="text-xs text-gray-500">
                                        {formatDate(comment.createdAt)}
                                    </span>
                                </div>
                                <p className="text-gray-700 text-sm">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard; 