import '../styles/home.css'
function About() {
    return ( 
        <div style={{color: 'white', marginTop: '100px', marginBottom: '100px'}}>
           
                <div>
                    <div style={{width: '100%', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{backgroundColor: 'rgb(22, 94, 154)', width: '50px', height: '1px', margin: '5px'}}></div>
                        <h1 style={{color:'rgb(22, 94, 154)' }}> About The Hub </h1>
                        <div style={{backgroundColor: 'rgb(22, 94, 154)', width: '50px', height: '1px', margin: '5px'}}></div>
                    </div>
                    <div className='about-background'>
                    <div>
                        <div className='about-right'>
                                <div>
                                    <h1> Why shop with us</h1>
                                    <p> At The HuB Market Place, we prioritize convenience and customer satisfaction. Our easy-to-navigate website ensures a hassle-free shopping experience, while our dedicated team is committed to quality service and fast shipping. Shop with us today and discover why The HuB is your go-to destination for wine, crabs, and socks online.</p>
                                </div>
                                <div>
                                    <h1> Wine Selection </h1>
                                    <p> Dive into our extensive collection of wines, sourced from renowned vineyards worldwide. Whether you're a connoisseur searching for a rare vintage or a casual drinker looking to explore new tastes, our wine selection promises to elevate any occasion with the perfect blend of quality and flavor.</p>
                                </div>
                                <div>
                                    <h1> Gourment Crabs </h1>
                                    <p> Seafood lovers rejoice! Our premium crabs are a true delicacy, offering the fresh flavors of the ocean right to your doorstep. Sourced sustainably and packed with care, our crabs are perfect for a luxurious feast or a special weekend treat. </p>
                                </div>
                                <div>
                                    <h1> Exclusive Socks </h1>
                                    <p> Upgrade your style with our range of high-quality socks. Featuring unique designs and exceptional comfort, our socks are more than just a wardrobe staple. They're a statement of style, perfect for those who want to stand out from the crowd or enjoy a touch of luxury beneath their steps.</p>
                                </div>
                        </div>
                        </div>
                    </div>
        
                </div>
        
        </div>
     );
}

export default About;