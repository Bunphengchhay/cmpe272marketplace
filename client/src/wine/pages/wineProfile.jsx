import { useAuth } from "../../hub/function/authentication";
import { useEffect, useState } from "react";
import SubmitComments from "../../hub/function/updatecomments";
import fetchComments from "../../hub/function/getcomment";
// import ReviewInput from "./ReviewInput";
import fetchPerProductInfo from "../../hub/function/getPerProductInfo";

function WineProfile() {
    const { productInformations} = useAuth();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (productInformations.wine_id || productInformations.cocktail_id) {
            getAllComments(productInformations.wine_id || productInformations.cocktail_id, productInformations.wine_id ? 'wine' : 'cocktail');
        }
    }, [productInformations]);

    const getAllComments = async (productId, productType) => {
        try {
            const commentsAll = await fetchComments(productId, productType);
            setComments(commentsAll);
        } catch (error) {
            console.error('Error fetching comments:', error.message);
        }
    }

    return (
        <div style={{ width: '100%', height: 'auto', paddingTop: '80px' }}>
            <div className="wineprofileinformation">
                <div className="left">
                    <img src={productInformations?.image_url} alt={productInformations?.wine_name ? productInformations.wine_name : productInformations?.cocktail_name} />
                </div>
                <div className="right">
                    <div>
                        <h3> Product Name: {productInformations?.wine_name ? productInformations?.wine_name : productInformations?.cocktail_name}</h3>
                        <h5 style={{ marginTop: '10px' }}> Price: {productInformations?.price}</h5>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button style={{ margin: '10px' }}> Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', backgroundColor: 'aliceblue' }}>
                    <div style={{ padding: 10 }}>
                        <h3> STATUS </h3>
                        <p> Rating Average: {productInformations?.rating_average}</p>
                        <p> Number of Rating: { productInformations?.number_of_ratings}</p>
                    </div>
                </div>
            </div>
            <br />
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', backgroundColor: 'aliceblue', height: 'auto' }}>
                    <div style={{ padding: 10 }}>
                        <h4> Add Your Review  </h4>
                        <ReviewInput wine={productInformations?.wine ? productInformations?.wine : productInformations?.cocktail} getAllComments={getAllComments}/>
                    </div>
                </div>
            </div>
            <br />
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', backgroundColor: 'aliceblue', height: 'auto' }}>
                    <div style={{ padding: 10 }}>
                        <h4> Comments </h4>
                        <br/>
                        {[...comments].reverse().map((comment, index) => (
                            <div key={index}>
                                <div style={{marginBottom: '10px'}}>
                                    <p> Anonymous</p>
                                    <br/>
                                    <li>{comment}</li>
                                    <div style={{width: '100%', height: '1px', backgroundColor: 'lightgray'}}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default WineProfile;


const ReviewInput = ({ wine, getAllComments}) => {
    const { productInformations } = useAuth();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [emoji, setEmoji] = useState('');
    const { isReviewed, setIsReviewed, setProductInformations, setRefreshProducts } = useAuth();

    const handleKeyDown = (e) => {
        e.preventDefault(); // Prevent default behavior of adding a new line in the input field
        if (review) {
            setReview(review + '\n');
        } else {
            setReview(review);
        }
    };

    const handleRatingChange = (index) => {
        const newRating = index;
        getEmoji(newRating);
        setRating(newRating);
    };

    const updateComments = async () => {
        setRating(0);
        setReview('');
        setEmoji('');
        let wineId = null;
        let cocktailId = null;
    
        if (productInformations?.wine_id) {
            wineId = productInformations.wine_id;
        } else {
            cocktailId = productInformations?.cocktail_id;
        }
    
        try {
            // Submit the comments
            await SubmitComments(review, rating, wineId, cocktailId);
    
            // Fetch the updated product information after submitting the review
            // const updatedProductInfo = await fetchPerProductInfo(wineId || cocktailId, wineId ? 'wine' : 'cocktail');
        const productId = productInformations.wine_id || productInformations.cocktail_id;
        const productType = productInformations.wine_id ? 'wine' : 'cocktail';
        fetchPerProductInfo(productId, productType)
            .then(newPerProductItem => {
                setProductInformations({...productInformations, 
                    rating_average: newPerProductItem.productInfo[0].rating_average || productInformations.rating_average,
                    number_of_ratings: newPerProductItem.productInfo[0].number_of_ratings || productInformations.number_of_ratings});
            })
            .catch(error => console.error('Error fetching product information:', error.message));
    
        // setRefreshProduct(true);
            // Fetch comments again to ensure they are up-to-date
            await getAllComments(wineId || cocktailId, wineId ? 'wine' : 'cocktail');
            setRefreshProducts(true);
        } catch (error) {
            console.error('Error updating comments:', error.message);
        }
    }
    

    const getEmoji = (num) => {
        switch (num) {
            case 0:
                setEmoji('');
                break;
            case 1:
            case 2:
                setEmoji('😢'); // crying emoji
                break;
            case 3:
                setEmoji('😔'); // sad face
                break;
            case 4:
                setEmoji('😊'); // smile
                break;
            case 5:
                setEmoji('❤️'); // laugh with heart on the eye emoji
                break;
            default:
                setEmoji(''); // if num is not in the range 1-5
                break;
        }
    }

    return (
        <div>
            {!isReviewed && <div>
                <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: 10 }}>Rate This</p>
                    <RatingChange handleRatingChange={handleRatingChange} rating={rating} />
                    <p style={{ marginLeft: '5px', color: 'red' }}> {rating > 0 ? rating : ''} </p>
                    <p style={{ marginLeft: '5px', color: 'red' }}> {emoji} </p>
                </div>
                <div style={{ flexDirection: 'column' }}>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Enter your review..."
                        style={{ width: '90%', minHeight: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
                        onClick={handleKeyDown}
                    />
                    <button style={{ marginTop: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }} onClick={updateComments}>Submit</button>
                </div>
            </div>}
            {isReviewed && <div>
                <p>Thank you for your review!</p>
            </div>}
        </div>
    );
}

// export default ReviewInput;

function RatingChange({ handleRatingChange, rating }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    style={{
                        fontSize: '15px',
                        cursor: 'pointer',
                        color: i < rating ? 'red' : 'black',
                    }}
                    onClick={() => handleRatingChange(i + 1)}
                >
                    O
                </span>
            ))}
        </div>
    );
}
