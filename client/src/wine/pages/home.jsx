import champagne from "../artifact/Cocktail.gif";
import "../style/styles.css";
import { Link } from "react-router-dom";

function WineHome() {
    return (
        <div className="winehome" style={{backgroundImage: `url(${champagne})`, backgroundSize: '100% 110%', width: '100%', height: '110vh', position: 'fixed', top: 0, left: 0}}>
            <div className="homebackgroundTitle">
                <div style={{textAlign: 'center'}}> 
                    <h1 style={{fontSize: '50px'}}> Welcome </h1>
                    <h2> Enjoy our selection just for you</h2>
                    <h2> Local to San Jose, CA</h2>
                    <br/>
                    <Link to="/products/wine/wineproducts"> Selected Drinks</Link>
                </div>
            </div>
        </div>
    );
}

export default WineHome;
