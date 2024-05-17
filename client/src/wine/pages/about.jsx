import "../style/styles.css";

function WineAbout() {
    return ( 
        <div className="wineAbout">
            <video className="wineAboutbackground" autoPlay loop muted>
                <source src="https://videos.pexels.com/video-files/5657050/5657050-uhd_4096_2160_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div style={{textAlign: 'center', margin: '20px'}}> 
                <h1> Our Mission</h1>
                <br/>
                <p> 
                Welcome to ECSTASY, your premier destination for luxury wines and cocktails sourced directly from California's finest vineyards and mixologists.

                At ECSTASY, we're passionate about curating an exceptional selection of wines and cocktails that embody the essence of California's rich viticulture and cocktail culture. <br/><br/>From exquisite Cabernets to artisanal cocktails, each bottle tells a unique story of craftsmanship and dedication.

                With a keen eye for quality and a commitment to excellence, we strive to provide our customers with an unparalleled shopping experience.<br/><br/> Whether you're a connoisseur seeking rare vintages or a cocktail enthusiast exploring new flavors, we invite you to indulge in the finest offerings from the Golden State.

                Elevate your gatherings, celebrate special moments, or simply treat yourself to a taste of luxury with ECSTASY. Cheers to unforgettable experiences and the joy of discovery!</p>
            </div>
        </div>
    );
}

export default WineAbout;

