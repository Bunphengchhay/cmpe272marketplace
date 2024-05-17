import "../styles/product.css";
import { useState } from "react";
import { useLocation, Outlet, Link } from "react-router-dom";

function Products() {
    const location = useLocation();
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    };

    return (
        <div>
            <div className="productHeader">
                <nav className="nav">
                    <Link
                        to="wine"
                        id="thehublist"
                        style={{
                            color:
                                location.pathname === "/products/wine" ? "red" : "rgb(22, 94, 154)",
                        }}
                    >
                        Wines
                    </Link>
                    <Link
                        to="crabs"
                        id="thehublist"
                        style={{
                            color:
                                location.pathname === "/products/crabs" ? "red" : "rgb(22, 94, 154)",
                        }}
                    >
                        Crabs
                    </Link>
                    <Link
                        to="socks"
                        id="thehublist"
                        style={{
                            color:
                                location.pathname === "/products/socks" ? "red" : "rgb(22, 94, 154)",
                        }}
                    >
                        Socks
                    </Link>
                </nav>
            </div>
            {location.pathname === '/products' &&
            <div>
                <p style={{margin: '10px'}}> please select your market options</p>
            </div>
            }
            {location.pathname !== '/products' && <div className="products" style={{ marginBottom: "50px" }}>
                <Outlet />
            </div>}
        </div>
    );
}

export default Products;

