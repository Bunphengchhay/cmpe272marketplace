import { endpoint } from "../config/config";
const fetchComments = async (productId, productType) => {
    try {
        const response = await fetch(`${endpoint}/getComments?productId=${productId}&productType=${productType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch comments. Please try again.');
        }

        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        throw error;
    }
};
export default fetchComments;