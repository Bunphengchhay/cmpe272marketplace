import { useState } from "react";
function wineProducts() {

    return ( 
        <div className="wineProducts">
            <div style={{textAlign: 'center', margin: '50px'}}> 
                <h1 style={{fontSize: 'medium'}}> Wine Selections</h1>
                <p style={{fontSize: 'small'}}> ecstasy, San Jose</p>
            </div>
            <DisplayCard data={wines}/>
            <div style={{width: '100%', textAlign: 'center', margin: '50px'}}> 
                <h1 style={{fontSize: 'medium'}}> Cocktail Selections</h1>
                <p style={{fontSize: 'small'}}> ECSTASY, San Jose</p>
            </div>
            <DisplayCard data={cocktail_products}/>
        </div>
     );
}

export default wineProducts;

function DisplayCard({ data }) {
    
    // State to track the index of the card for which the review page should be shown
    const [showReviewPageIndex, setShowReviewPageIndex] = useState(null);
  
    // Function to toggle the display of the review page for a specific card
    const toggleReviewPage = (index) => {
      setShowReviewPageIndex(showReviewPageIndex === index ? null : index);
    };
    // Function to handle rating change
    const handleRatingChange = (event) => {
        // logic
    };
  
    return (
      <div className="wineCards">
        {data?.map((wine, index) => (
          <div className="wineCard" key={index}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ backgroundImage: `url(${wine.url})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '95%', height: '300px', borderRadius: '15px', marginTop: '7px' }} id='productshow'>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                      <p>Rating: {wine.rating}</p>
                    </div>
                  </div>
                  {showReviewPageIndex === index && (
                    <div style={{ flex: 1, backgroundColor: 'rgba(240, 248, 255, 0.98)' }} id='reviewpage'>
                      <ReviewInput wine = {wine} index={index}/>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
              <p>{wine.name}</p>
              <p>${wine.price}</p>
            </div>
            <button onClick={() => toggleReviewPage(index)}>Review</button>
          </div>
        ))}
      </div>
    );
  }

  const ReviewInput = ({wine, index}) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
  
    const handleKeyDown = (e) => {
        e.preventDefault(); // Prevent default behavior of adding a new line in the input field
        setReview(review + '\n');
        console.log(review);
    };

    const handleRatingChange = (index) => {
        // Incrementing index by 1 because rating starts from 1, not 0
        const newRating = index;
        setRating(newRating);
        console.log('rating', newRating);
    };
      
  
    return (
      <div key = {index}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{marginBottom: 0}}>Rate This</p>
            <RatingChange wine ={wine} handleRatingChange={handleRatingChange} rating = {rating}/>
        </div>
        <p style={{marginTop: 0}}> 126 reviews </p>
        <textarea
          id = {index}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        //   onKeyDown={handleKeyDown}
          placeholder="Enter your review..."
          style={{ width: '90%', minHeight: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' , marginTop: '5px'}}
        />
        <button style={{ marginTop: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }} onClick={handleKeyDown}>Submit</button>
      </div>
    );
  };

  function RatingChange({ wine, handleRatingChange, rating }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: '15px',
              cursor: 'pointer',
              color: i < rating ? 'blue' : 'black',
            }}
            onClick={() => handleRatingChange(i+1)}
          >
        O
          </span>
        ))}
      </div>
    );
  }
  


const wines = [
    {
        name: "Sunset Serenade Chardonnay",
        price: "55.00",
        rating: '4.5',
        url: "https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Velvet Elegance Merlot",
        price: "77.00",
        rating: '4.8',
        url: "https://images.pexels.com/photos/162691/wine-bottle-white-lemons-162691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Golden Harvest Sauvignon Blanc",
        price: "125.00",
        rating: '4.9',
        url: "https://images.pexels.com/photos/14661495/pexels-photo-14661495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Ruby Twilight Pinot Noir",
        price: "28.00",
        rating: '4.1',
        url: "https://images.pexels.com/photos/4940833/pexels-photo-4940833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Sparkling Starlight Rosé",
        price: "27.00",
        rating: '4.9',
        url: "https://images.pexels.com/photos/10445949/pexels-photo-10445949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Midnight Magic Cabernet Sauvignon",
        price: "48.00",
        rating: '5.0',
        url: "https://images.pexels.com/photos/3490355/pexels-photo-3490355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Whispering Breeze Riesling",
        price: "60.00",
        rating: '4.5',
        url: "https://images.pexels.com/photos/11514544/pexels-photo-11514544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Enchanted Valley Shiraz",
        price: "36.00",
        rating: '4.7',
        url: "https://images.pexels.com/photos/6513821/pexels-photo-6513821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Celestial Symphony Johny Walker",
        price: "35.00",
        rating: '4.3',
        url: "https://images.pexels.com/photos/19454568/pexels-photo-19454568/free-photo-of-bottle-of-johnnie-walker-whisky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Secret Garden Gewürztraminer",
        price: "99.00",
        rating: '4.2',
        url: "https://images.pexels.com/photos/16849849/pexels-photo-16849849/free-photo-of-bottle-of-whisky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
];
const cocktail_products = [
    {name: "Sapphire Sunset Martini", price: 12.99, rating: '4.1', url: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {name: "Golden Coast Mojito", price: 10.99, rating: '4.6', url: 'https://images.pexels.com/photos/4631019/pexels-photo-4631019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {name: "Velvet Orchid Negroni", price: 11.99, rating: '4.7',url: 'https://images.pexels.com/photos/3196019/pexels-photo-3196019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {name: "Caribbean Dream Punch", price: 9.99, rating: '4.3', url: 'https://images.pexels.com/photos/4085480/pexels-photo-4085480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {name: "Crimson Fire Margarita", price: 13.99, rating: '4.3', url: 'https://images.pexels.com/photos/4051365/pexels-photo-4051365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {name: "Midnight Sapphire Spritz", price: 12.49, rating: '4.4', url: 'https://images.pexels.com/photos/616836/pexels-photo-616836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {name: "Emerald Isle Daiquiri", price: 11.49, rating: '4.2', url: 'https://images.pexels.com/photos/10540960/pexels-photo-10540960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {name: "Tropical Breeze Sangria", price: 14.99, rating: '4.6', url: 'https://images.pexels.com/photos/10639084/pexels-photo-10639084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {name: "Amber Glow Old Fashioned", price: 12.99, rating: '4.9', url: 'https://images.pexels.com/photos/8580432/pexels-photo-8580432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {name: "Diamond Sparkle Gimlet", price: 10.49, rating: '4.8', url:'https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
]
