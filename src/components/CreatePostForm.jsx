import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePostForm = ({ onPostCreated, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'general',
        tags: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const categories = [
        { value: 'general', label: 'General' },
        { value: 'visa', label: 'Visa' },
        { value: 'jobs', label: 'Jobs' },
        { value: 'education', label: 'Education' },
        { value: 'housing', label: 'Housing' },
        { value: 'culture', label: 'Culture' },
        { value: 'other', label: 'Other' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!token) {
            navigate('/login');
            return;
        }

        if (!formData.title.trim() || !formData.content.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            const response = await axios.post(`http://localhost:5000/api/posts`, {
                ...formData,
                tags
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            onPostCreated(response.data);
            setFormData({ title: '', content: '', category: 'general', tags: '' });
            onCancel();
        } catch (error) {
            // Removed console.log and alert for production
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-[#588157] mb-4">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a3b18a] focus:outline-none transition-colors duration-300"
                        placeholder="Enter post title..."
                        required
                        maxLength={200}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a3b18a] focus:outline-none transition-colors duration-300"
                    >
                        {categories.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a3b18a] focus:outline-none transition-colors duration-300"
                        placeholder="Write your post content..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a3b18a] focus:outline-none transition-colors duration-300"
                        placeholder="visa, immigration, help"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Add relevant tags to help others find your post
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-[#a3b18a] text-white rounded-lg hover:bg-[#588157] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Post'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-300 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePostForm; 