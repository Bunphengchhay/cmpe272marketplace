import { useState, useEffect } from "react";
import React from "react";
import { endpoint } from "../../hub/config/config";
import {Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hub/function/authentication";
// import VisitedProducts from "../../hub/function/getProductVeiwer";
import GetVisitedProducts from "../../wine/components/visitedProduct";

function WineProducts() {
  const [products, setProducts] = useState(JSON.parse(sessionStorage.getItem('products')) || []);
  const {productInformations, setProductInformations, isReviewed, setIsReviewed, refreshProducts, setRefreshProducts} = useAuth();
  useEffect(() => {
      if(refreshProducts){
      fetchProducts();
      setRefreshProducts(false);
      console.log('All products have been fetched');
      }
      setIsReviewed(false);
      console.log('All products have not been fetched');

   
  }, [refreshProducts]); // Empty dependency array to ensure useEffect runs only once

  const fetchProducts = () => {
    fetch(`${endpoint}/products`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        console.log(data)
        sessionStorage.setItem('products', JSON.stringify(data));
      })
      .catch(error => console.error(error));
  }
  return (
    <div className="wineProducts">
      <div style={{ textAlign: 'center', margin: '50px' }}>
        <h1 style={{ fontSize: 'medium' }}> Wine Selections</h1>
        <p style={{ fontSize: 'small' }}> ecstasy, San Jose</p>
      </div>
      <DisplayCard data={products?.wine ? products.wine : wines} setProductInformations={setProductInformations}/>
      <div style={{ width: '100%', textAlign: 'center', margin: '50px' }}>
        <h1 style={{ fontSize: 'medium' }}> Cocktail Selections</h1>
        <p style={{ fontSize: 'small' }}> ecstasy, San Jose</p>
      </div>
      <DisplayCard data={products?.cocktail ? products.cocktail : cocktail_products} setProductInformations={setProductInformations} />

      <div style={{marginTop: '50px', marginBottom: '50px'}}>
        <h1 style={{ fontSize: 'medium', textAlign: 'center' }}> Most Visited Products</h1>
        <p style={{ fontSize: 'small', textAlign: 'center' }}> The Top 5 Visited Products in this week.</p>
        <GetVisitedProducts/>
      </div>
    </div>
  );
}

export default WineProducts;

function DisplayCard({ data, setProductInformations, setRefreshProduct }) {
   const navigate = useNavigate();
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

    const handleSeeProfile = (prod) => {
      setProductInformations(prod);
      localStorage.setItem('productInformations', prod);
      // navigate("/products/wine/wineprofile"); // Navigate after setting product information
      // Determine whether the product is wine or cocktail and navigate accordingly
      if (prod.wine_id) {
        console.log(prod.wine_name);
        navigate(`/products/wine/wineprofile/wine/${prod.wine_name}/${prod.wine_id}`);
      } else if (prod.cocktail_id) {
        console.log(prod.cocktail_name);
        navigate(`/products/wine/wineprofile/cocktail/${prod.cocktail_name}/${prod.cocktail_id}`);
      }
    };
  
  
    return (
      <div className="wineCards">
        {data?.map((wine, index) => (
          <div className="wineCard" key={index}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ backgroundImage: `url(${wine.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '95%', height: '300px', borderRadius: '15px', marginTop: '7px' }} id='productshow'>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                      <p>Rating: {wine.rating_average}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: '100%', marginTop: '5px'}}>
              <p style={{textAlign: 'center', margin: '10px'}}>${wine.price}</p>
              <button style={{textAlign: 'center', width: 'auto', padding: '10px'}} onClick={() => handleSeeProfile(wine)}>{wine.wine_name? wine.wine_name : wine.cocktail_name}</button>
            </div>
            {/* <button onClick={() => toggleReviewPage(index)}>Review</button> */}
          </div>
        ))}
      </div>
    );
  }

  
const wines= [
    {
        "wine_id": "1",
        "wine_name": "Sunset Serenade Chardonnay",
        "price": "55.00",
        "number_of_ratings": "1200",
        "rating_average": "4.50",
        "image_url": "https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "wine_id": "2",
        "wine_name": "Velvet Elegance Merlot",
        "price": "77.00",
        "number_of_ratings": "1500",
        "rating_average": "4.80",
        "image_url": "https://images.pexels.com/photos/162691/wine-bottle-white-lemons-162691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "wine_id": "3",
        "wine_name": "Golden Harvest Sauvignon Blanc",
        "price": "125.00",
        "number_of_ratings": "1800",
        "rating_average": "4.90",
        "image_url": "https://images.pexels.com/photos/14661495/pexels-photo-14661495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "wine_id": "4",
        "wine_name": "Ruby Twilight Pinot Noir",
        "price": "28.00",
        "number_of_ratings": "900",
        "rating_average": "4.10",
        "image_url": "https://images.pexels.com/photos/4940833/pexels-photo-4940833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "wine_id": "5",
        "wine_name": "Sparkling Starlight Rosé",
        "price": "27.00",
        "number_of_ratings": "2000",
        "rating_average": "4.90",
        "image_url": "https://images.pexels.com/photos/10445949/pexels-photo-10445949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "wine_id": "6",
        "wine_name": "Midnight Magic Cabernet Sauvignon",
        "price": "48.00",
        "number_of_ratings": "2500",
        "rating_average": "5.00",
        "image_url": "https://images.pexels.com/photos/3490355/pexels-photo-3490355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "wine_id": "7",
        "wine_name": "Whispering Breeze Riesling",
        "price": "60.00",
        "number_of_ratings": "1700",
        "rating_average": "4.50",
        "image_url": "https://images.pexels.com/photos/11514544/pexels-photo-11514544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "wine_id": "8",
        "wine_name": "Enchanted Valley Shiraz",
        "price": "36.00",
        "number_of_ratings": "2100",
        "rating_average": "4.70",
        "image_url": "https://images.pexels.com/photos/6513821/pexels-photo-6513821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "wine_id": "9",
        "wine_name": "Celestial Symphony Johny Walker",
        "price": "35.00",
        "number_of_ratings": "1300",
        "rating_average": "4.30",
        "image_url": "https://images.pexels.com/photos/19454568/pexels-photo-19454568/free-photo-of-bottle-of-johnnie-walker-whisky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "wine_id": "10",
        "wine_name": "Secret Garden Gewürztraminer",
        "price": "99.00",
        "number_of_ratings": "1500",
        "rating_average": "4.20",
        "image_url": "https://images.pexels.com/photos/16849849/pexels-photo-16849849/free-photo-of-bottle-of-whisky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
]
const cocktail_products= [
    {
        "cocktail_id": "1",
        "cocktail_name": "Sapphire Sunset Martini",
        "price": "12.99",
        "number_of_ratings": "1500",
        "rating_average": "4.10",
        "image_url": "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "cocktail_id": "2",
        "cocktail_name": "Golden Coast Mojito",
        "price": "10.99",
        "number_of_ratings": "1800",
        "rating_average": "4.60",
        "image_url": "https://images.pexels.com/photos/4631019/pexels-photo-4631019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "cocktail_id": "3",
        "cocktail_name": "Velvet Orchid Negroni",
        "price": "11.99",
        "number_of_ratings": "2000",
        "rating_average": "4.70",
        "image_url": "https://images.pexels.com/photos/3196019/pexels-photo-3196019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "cocktail_id": "4",
        "cocktail_name": "Caribbean Dream Punch",
        "price": "9.99",
        "number_of_ratings": "1200",
        "rating_average": "4.30",
        "image_url": "https://images.pexels.com/photos/4085480/pexels-photo-4085480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "cocktail_id": "5",
        "cocktail_name": "Crimson Fire Margarita",
        "price": "13.99",
        "number_of_ratings": "1400",
        "rating_average": "4.30",
        "image_url": "https://images.pexels.com/photos/4051365/pexels-photo-4051365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "cocktail_id": "6",
        "cocktail_name": "Midnight Sapphire Spritz",
        "price": "12.49",
        "number_of_ratings": "1700",
        "rating_average": "4.40",
        "image_url": "https://images.pexels.com/photos/616836/pexels-photo-616836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "cocktail_id": "7",
        "cocktail_name": "Emerald Isle Daiquiri",
        "price": "11.49",
        "number_of_ratings": "1900",
        "rating_average": "4.20",
        "image_url": "https://images.pexels.com/photos/10540960/pexels-photo-10540960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "cocktail_id": "8",
        "cocktail_name": "Tropical Breeze Sangria",
        "price": "14.99",
        "number_of_ratings": "1600",
        "rating_average": "4.60",
        "image_url": "https://images.pexels.com/photos/10639084/pexels-photo-10639084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "cocktail_id": "9",
        "cocktail_name": "Amber Glow Old Fashioned",
        "price": "12.99",
        "number_of_ratings": "2200",
        "rating_average": "4.90",
        "image_url": "https://images.pexels.com/photos/8580432/pexels-photo-8580432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "cocktail_id": "10",
        "cocktail_name": "Diamond Sparkle Gimlet",
        "price": "10.49",
        "number_of_ratings": "2100",
        "rating_average": "4.80",
        "image_url": "https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
]

// const wines = [
//     {
//         name: "Sunset Serenade Chardonnay",
//         price: "55.00",
//         rating: '4.5',
//         url: "https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//         name: "Velvet Elegance Merlot",
//         price: "77.00",
//         rating: '4.8',
//         url: "https://images.pexels.com/photos/162691/wine-bottle-white-lemons-162691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//         name: "Golden Harvest Sauvignon Blanc",
//         price: "125.00",
//         rating: '4.9',
//         url: "https://images.pexels.com/photos/14661495/pexels-photo-14661495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//         name: "Ruby Twilight Pinot Noir",
//         price: "28.00",
//         rating: '4.1',
//         url: "https://images.pexels.com/photos/4940833/pexels-photo-4940833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//         name: "Sparkling Starlight Rosé",
//         price: "27.00",
//         rating: '4.9',
//         url: "https://images.pexels.com/photos/10445949/pexels-photo-10445949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//         name: "Midnight Magic Cabernet Sauvignon",
//         price: "48.00",
//         rating: '5.0',
//         url: "https://images.pexels.com/photos/3490355/pexels-photo-3490355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//         name: "Whispering Breeze Riesling",
//         price: "60.00",
//         rating: '4.5',
//         url: "https://images.pexels.com/photos/11514544/pexels-photo-11514544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//         name: "Enchanted Valley Shiraz",
//         price: "36.00",
//         rating: '4.7',
//         url: "https://images.pexels.com/photos/6513821/pexels-photo-6513821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//         name: "Celestial Symphony Johny Walker",
//         price: "35.00",
//         rating: '4.3',
//         url: "https://images.pexels.com/photos/19454568/pexels-photo-19454568/free-photo-of-bottle-of-johnnie-walker-whisky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//         name: "Secret Garden Gewürztraminer",
//         price: "99.00",
//         rating: '4.2',
//         url: "https://images.pexels.com/photos/16849849/pexels-photo-16849849/free-photo-of-bottle-of-whisky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     }
// ];
// const cocktail_products = [
//     {name: "Sapphire Sunset Martini", price: 12.99, rating: '4.1', url: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
//     {name: "Golden Coast Mojito", price: 10.99, rating: '4.6', url: 'https://images.pexels.com/photos/4631019/pexels-photo-4631019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
//     {name: "Velvet Orchid Negroni", price: 11.99, rating: '4.7',url: 'https://images.pexels.com/photos/3196019/pexels-photo-3196019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
//     {name: "Caribbean Dream Punch", price: 9.99, rating: '4.3', url: 'https://images.pexels.com/photos/4085480/pexels-photo-4085480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
//     {name: "Crimson Fire Margarita", price: 13.99, rating: '4.3', url: 'https://images.pexels.com/photos/4051365/pexels-photo-4051365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
//     {name: "Midnight Sapphire Spritz", price: 12.49, rating: '4.4', url: 'https://images.pexels.com/photos/616836/pexels-photo-616836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
//     {name: "Emerald Isle Daiquiri", price: 11.49, rating: '4.2', url: 'https://images.pexels.com/photos/10540960/pexels-photo-10540960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
//     {name: "Tropical Breeze Sangria", price: 14.99, rating: '4.6', url: 'https://images.pexels.com/photos/10639084/pexels-photo-10639084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
//     {name: "Amber Glow Old Fashioned", price: 12.99, rating: '4.9', url: 'https://images.pexels.com/photos/8580432/pexels-photo-8580432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
//     {name: "Diamond Sparkle Gimlet", price: 10.49, rating: '4.8', url:'https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
// ]
