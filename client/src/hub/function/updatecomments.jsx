import { endpoint } from "../config/config";
const SubmitComments = async (review, rating, wineId, cocktailId) => {
    try {
        const bodyData = {
            comment: review,
            rating: rating,
            wineId: wineId,
            cocktailId: cocktailId
        };
        // console.log(bodyData);

        const response = await fetch(`${endpoint}/updateComments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) {
            throw new Error('Failed to insert new comment. Please try again.');
        }

        const data = await response.json();

        if (data.status === 'ok') {
            // console.log('Inserted new comment successfully');
            // Optionally, you can return data from the server if needed
            return { success: true, message: 'Inserted new comment successfully' };
        } else {
            throw new Error('Unable to insert new comment. Please try again.');
        }
    } catch (error) {
        console.error('Error inserting comment:', error.message);
        return { success: false, message: error.message };
    }
};
export default SubmitComments;