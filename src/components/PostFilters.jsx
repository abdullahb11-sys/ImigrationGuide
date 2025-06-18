const PostFilters = ({ 
    selectedCategory, 
    onCategoryChange, 
    searchQuery, 
    onSearchChange,
    onSearchSubmit 
}) => {
    const categories = [
        { value: 'all', label: 'All Posts' },
        { value: 'general', label: 'General' },
        { value: 'visa', label: 'Visa' },
        { value: 'jobs', label: 'Jobs' },
        { value: 'education', label: 'Education' },
        { value: 'housing', label: 'Housing' },
        { value: 'culture', label: 'Culture' },
        { value: 'other', label: 'Other' }
    ];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit();
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a3b18a] focus:outline-none transition-colors duration-300"
                >
                    {categories.map(category => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
                
                <form onSubmit={handleSearchSubmit} className="flex-1 flex">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[#a3b18a] focus:outline-none transition-colors duration-300"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#a3b18a] text-white rounded-r-lg hover:bg-[#588157] transition-colors duration-300"
                    >
                        🔍
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostFilters; 