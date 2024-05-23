import { endpoint } from "../config/config";

const twoMarketTraffics = async () => {
    try {
        const response = await fetch(`${endpoint}/getMarketTraffics`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch visited products.');
        }

        const visitedProducts = await response.json();
        return visitedProducts;
    } catch (error) {
        console.error('Error fetching visited products:', error.message);
        return [];
    }
};

export default twoMarketTraffics;
