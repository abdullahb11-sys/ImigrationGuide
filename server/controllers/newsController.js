import axios from 'axios';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

// Get API key from environment variables
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Verify API key is available
if (!NEWS_API_KEY) {
    console.error('NEWS_API_KEY is not defined in environment variables');
}

const getImmigrationNews = async (req, res) => {
    try {
        if (!NEWS_API_KEY) {
            throw new Error('News API key is not configured');
        }

        const { page = 1, country, type } = req.query;
        const pageSize = 10;
        const MAX_PAGES = 5; // Limit to 5 pages maximum

        // Construct the search query based on parameters
        let searchQuery = '';
        
        if (type === 'jobs') {
            searchQuery = '(immigration OR visa OR work permit) AND (job OR employment OR career OR work)';
        } else if (type === 'education') {
            searchQuery = '(immigration OR visa OR student visa) AND (education OR university OR college OR study OR scholarship)';
        } else {
            // Default: both jobs and education
            searchQuery = '(immigration OR visa OR work permit OR student visa) AND (job OR employment OR education OR university OR college OR study OR scholarship)';
        }

        // Add country filter if specified
        if (country) {
            searchQuery += ` AND ${country}`;
        }

        console.log('Search Query:', searchQuery);
        
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: searchQuery,
                apiKey: NEWS_API_KEY,
                language: 'en',
                sortBy: 'publishedAt',
                page: Math.min(page, MAX_PAGES), // Ensure page doesn't exceed MAX_PAGES
                pageSize: pageSize,
                domains: 'bbc.com,reuters.com,cnn.com,nytimes.com,wsj.com,forbes.com,techcrunch.com,ed.gov,studyabroad.com'
            }
        });

        // Format the response
        const formattedNews = response.data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            imageUrl: article.urlToImage,
            source: article.source.name,
            publishedAt: article.publishedAt,
            content: article.content,
            type: type || 'both'
        }));

        // Calculate total pages, but limit it to MAX_PAGES
        const calculatedTotalPages = Math.ceil(response.data.totalResults / pageSize);
        const totalPages = Math.min(calculatedTotalPages, MAX_PAGES);

        res.json({
            status: 'success',
            data: formattedNews,
            totalResults: response.data.totalResults,
            currentPage: parseInt(page),
            totalPages: totalPages
        });
    } catch (error) {
        console.error('News API Error:', error.response?.data || error.message);
        res.status(500).json({
            status: 'error',
            message: error.response?.data?.message || 'Failed to fetch immigration news'
        });
    }
};

export { getImmigrationNews }; 