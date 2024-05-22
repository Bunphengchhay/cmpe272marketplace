import React, { useEffect, useState } from 'react';
import VisitedProducts from '../../hub/function/getProductVeiwer';
import "../style/visitedproduct.css";

function GetVisitedProducts() {
    const [visitedProducts, setVisitedProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        getVisitedProducts();
    }, []);
    
    const getVisitedProducts = async () => {
        setLoading(true);
        const data = await VisitedProducts();
        if (data) {
            // Restrict to top 5 products
            const top5Products = data.slice(0, 5);
            setVisitedProducts(top5Products);
        } else {
            setError('Failed to fetch visited products.');
        }
        setLoading(false);
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return ( 
        <div className="visitedProducts">
            {visitedProducts.map((product) => (
                <div className="visitedProduct" key={product.id}>
                    <div className="visitedCard">
                        <h5 style={{height: 30}}>{product.name}</h5>
                        <p style={{textAlign: 'left', margin: '5px'}}> - Type: {product.type}</p>
                        <p style={{textAlign: 'left', margin: '5px'}}> - Visited: {product.pageviews} </p>
                    </div>
                </div>
            ))}
        </div> 
    );
}

export default GetVisitedProducts;
