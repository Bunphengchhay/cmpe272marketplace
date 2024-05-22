import { endpoint } from "../config/config";

const VisitedProducts = async () => {
    try {
        const response = await fetch(`${endpoint}/getVisitedProducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch visited products.');
        }

        const visitedProducts = await response.json();
        // console.log(visitedProducts);
        return visitedProducts;
    } catch (error) {
        console.error('Error fetching visited products:', error.message);
        return null;
    }
};

export default VisitedProducts;


