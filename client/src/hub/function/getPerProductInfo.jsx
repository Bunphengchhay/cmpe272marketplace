import { endpoint } from "../config/config";
const fetchPerProductInfo = async (productId, productType) => {
    try {
        const response = await fetch(`${endpoint}/getPerProductInfo?productId=${productId}&productType=${productType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product information.');
        }

        const productInfo = await response.json();
        console.log(productInfo);
        return productInfo;
    } catch (error) {
        console.error('Error fetching product information:', error.message);
        return null;
    }
};
export default fetchPerProductInfo;