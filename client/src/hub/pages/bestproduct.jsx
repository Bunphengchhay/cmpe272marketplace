import GetVisitedProducts from "../../wine/components/visitedProduct";
function BestProducts() {
    return ( 
        <div style={{marginTop: '50px', marginBottom: '50px'}}>
        <h1 style={{ fontSize: 'medium', textAlign: 'center' }}> Most Visited Products</h1>
        <p style={{ fontSize: 'small', textAlign: 'center' }}> Across Our MarketPlaces</p>
        <p style={{ fontSize: 'small', textAlign: 'center' }}> The Top 5 Visited Products in this week.</p>
        <GetVisitedProducts/>
      </div>
     );
}

export default BestProducts;