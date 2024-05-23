import GetVisitedProducts from "../../wine/components/visitedProduct";
import { useState, useEffect } from "react";
import VisitedProducts from "../function/getProductVeiwer";
import twoMarketTraffics from "../function/getTwoMarketTraffic";
function BestProducts() {
  const [visitedProducts, setVisitedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alcohol, setAlcohol] = useState([]);
  const [twoTraffics, setTwoTraffics] = useState([]);

  useEffect(() => {
      getVisitedProducts();
      getTwoVisitedProducts()
      .then((data) => {
        setVisitedProducts(getTop5Products(alcohol, twoTraffics));
      })
      .catch((error) => {
          console.error('Error in useEffect:', error);
      });
      setVisitedProducts(getTop5Products(sock, twoTraffics));
  }, []);
  
  const getVisitedProducts = async () => {
      setLoading(true);
      const data = await VisitedProducts();
      if (data) {
          // Restrict to top 5 products
          const top5Products = data.slice(0, 5);
          setAlcohol(top5Products);
      } else {
          setError('Failed to fetch visited products.');
      }
      setLoading(false);
  };

  const getTwoVisitedProducts = async () => {
    const data = await twoMarketTraffics();
    if (data) {
        // Restrict to top 5 products
        const twotrafficdata = data.slice(0, 5);
        setTwoTraffics(twotrafficdata);
        return twotrafficdata; // Return the restricted data
    } else {
        setTwoTraffics([]); // Ensure state is updated with an empty array
        setError('Failed to fetch visited products.');
        return []; // Return an empty array
    }
};
  function getTop5Products(productList1, productList2) {
    const combined = [...productList1, ...productList2];
    combined.sort((a, b) => b.pageviews - a.pageviews);
    return combined.slice(0, 5);
    }



    return ( 
        <div style={{marginTop: '50px', marginBottom: '50px'}}>
        <h1 style={{ fontSize: 'medium', textAlign: 'center' }}> Most Visited Products</h1>
        <p style={{ fontSize: 'small', textAlign: 'center' }}> Across Our MarketPlaces</p>
        <p style={{ fontSize: 'small', textAlign: 'center' }}> The Top 5 Visited Products in this week.</p>
        {loading && <p>Loading...</p>}
        {!loading && (
        <div className="visitedProducts">
            {visitedProducts?.map((product, k) => (
            <div className="visitedProduct" key={product.id || k}>
                <div className="visitedCard">
                <h5 style={{ height: 30 }}>{product.name}</h5>
                <p style={{ textAlign: 'left', margin: '5px' }}> - Type: {product.type}</p>
                <p style={{ textAlign: 'left', margin: '5px' }}> - Visited: {product.pageviews}</p>
                </div>
            </div>
            ))}
        </div>
        )}

      </div>
     );
}

export default BestProducts;

const seafood = [
  {
      "id": "1",
      "name": "Ocean Delight Lobster",
      "type": "seafood",
      "pageviews": 8
  },
  {
      "id": "2",
      "name": "Sea Breeze Salmon",
      "type": "seafood",
      "pageviews": 7
  },
  {
      "id": "3",
      "name": "Golden Coast Shrimp",
      "type": "seafood",
      "pageviews": 6
  },
  {
      "id": "4",
      "name": "Tidal Wave Tuna",
      "type": "seafood",
      "pageviews": 5
  },
  {
      "id": "5",
      "name": "Deep Sea Scallops",
      "type": "seafood",
      "pageviews": 4
  },
  {
      "id": "6",
      "name": "Blue Ocean Crab",
      "type": "seafood",
      "pageviews": 3
  },
  {
      "id": "7",
      "name": "Sunset Bay Clams",
      "type": "seafood",
      "pageviews": 2
  },
  {
      "id": "8",
      "name": "Coral Reef Mussels",
      "type": "seafood",
      "pageviews": 1
  }
]

const sock = [
  {
      "id": "1",
      "name": "Comfy Cotton Socks",
      "type": "sock",
      "pageviews": 9
  },
  {
      "id": "2",
      "name": "Woolen Warmers",
      "type": "sock",
      "pageviews": 8
  },
  {
      "id": "3",
      "name": "Sporty Ankle Socks",
      "type": "sock",
      "pageviews": 7
  },
  {
      "id": "4",
      "name": "Striped Fun Socks",
      "type": "sock",
      "pageviews": 6
  },
  {
      "id": "5",
      "name": "Elegant Silk Socks",
      "type": "sock",
      "pageviews": 5
  },
  {
      "id": "6",
      "name": "Casual Crew Socks",
      "type": "sock",
      "pageviews": 4
  },
  {
      "id": "7",
      "name": "Fluffy Bedtime Socks",
      "type": "sock",
      "pageviews": 3
  },
  {
      "id": "8",
      "name": "Designer Patterned Socks",
      "type": "sock",
      "pageviews": 2
  }
]
