import { useAuth } from "../../hub/function/authentication";
import { useState } from "react";
import SubmitComments from "../../hub/function/updatecomments";

const ReviewInput = ({ wine, getAllComments }) => {
    const { productInformations } = useAuth();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [emoji, setEmoji] = useState('');
    const { isReviewed, setIsReviewed } = useAuth();

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
        setEmoji('')
        setIsReviewed(true)
        let wineId = null;
        let cocktailId = null;

        if (productInformations?.wine_id) {
            wineId = productInformations.wine_id;
        } else {
            cocktailId = productInformations?.cocktail_id;
        }
        await SubmitComments(review, rating, wineId, cocktailId);
        await getAllComments(wineId || cocktailId, wineId ? 'wine' : 'cocktail');
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

export default ReviewInput;

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

// import { useAuth } from "../../hub/function/authentication";
// import { useEffect, useState } from "react";
// import SubmitComments from "../../hub/function/updatecomments";
// // import fetchComments from "../../hub/function/getcomment";

// const ReviewInput = () => {
//     const { productInformations } = useAuth();
//     const [review, setReview] = useState('');
//     const [rating, setRating] = useState(0);
//     const [emoji, setEmoji] = useState('');
//     // const [isReviewed, setIsReviewed] = useState(false);
//     const {comments, setComments, isReviewed, setIsReviewed} = useAuth();
//     const handleKeyDown = (e) => {
//       e.preventDefault(); // Prevent default behavior of adding a new line in the input field
//       if (review){
//         setReview(review + '\n');
//       }
//       else{
//         setReview(review);
//       }
//     };
  
//     const handleRatingChange = (index) => {
//       const newRating = index;
//       getEmoji(newRating);
//       setRating(newRating);
//     };


//     const updateComments = () => {
//         setRating(0);
//         setReview('');
//         setEmoji('')
//         setIsReviewed(true)
//         let wineId = null;
//         let cocktailId = null;

//         if (productInformations?.wine_id){
//             wineId = productInformations.wine_id;
//         } else {
//             cocktailId = productInformations?.cocktail_id;
//         }
//         SubmitComments(review, rating, wineId, cocktailId);
//     }
//     const getEmoji = (num) => {
//         switch(num) {
//             case 0:
//                 setEmoji('');
//                 break;
//             case 1:
//             case 2:
//                 setEmoji('😢'); // crying emoji
//                 break;
//             case 3:
//                 setEmoji('😔'); // sad face
//                 break;
//             case 4:
//                 setEmoji('😊'); // smile
//                 break;
//             case 5:
//                 setEmoji('❤️'); // laugh with heart on the eye emoji
//                 break;
//             default:
//                 setEmoji(''); // if num is not in the range 1-5
//                 break;
//         }
//     }
    
//     return (
//       <div>
//       {!isReviewed && <div>
//             <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
//                 <p style={{margin: 10}}>Rate This</p>
//                 <RatingChange handleRatingChange={handleRatingChange} rating={rating}/>
//                 <p style={{marginLeft: '5px', color: 'red'}}> {rating > 0 ? rating : ''} </p>
//                 <p style={{marginLeft: '5px', color: 'red'}}> {emoji} </p>
//             </div>
//             <div style={{flexDirection: 'column'}}>
//                 <textarea
//                 value={review}
//                 onChange={(e) => setReview(e.target.value)}
//                 placeholder="Enter your review..."
//                 style={{ width: '90%', minHeight: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px'}}
//                 onClick = {handleKeyDown}
//                 />
//                 <button style={{ marginTop: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }} onClick={updateComments}>Submit</button>
//             </div>
//         </div>}
//         {isReviewed && <div>
//             <p>Thank you for your review!</p>
//         </div>}
       
//       </div>
//     );
//   };
// export default ReviewInput;

//   function RatingChange({handleRatingChange, rating }) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         {[...Array(5)].map((_, i) => (
//           <span
//             key={i}
//             style={{
//               fontSize: '15px',
//               cursor: 'pointer',
//               color: i < rating ? 'red' : 'black',
//             }}
//             onClick={() => handleRatingChange(i+1)}
//           >
//         O
//           </span>
//         ))}
//       </div>
//     );
//   }