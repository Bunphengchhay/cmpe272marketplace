import React, { useRef, useState, useEffect } from 'react';

function WineNews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const scrollToIndex = (index) => {
        containerRef.current.scrollTo({
            left: index * containerRef.current.offsetWidth,
            behavior: 'smooth',
        });
    };
    const handleScroll = () => {
        const scrollLeft = containerRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / containerRef.current.offsetWidth);
        setCurrentIndex(newIndex);
    };
    useEffect(() => {
        const element = containerRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
            return () => element.removeEventListener('scroll', handleScroll);
        }
    }, []);
    return ( 
        <div className="winenews">
            <div className= "newsScroll" style={{ display: 'flex', scrollSnapType: 'x mandatory', width: '100%', height: '50vh', overflowX: 'scroll', overflowY: 'hidden', position: 'relative' }} ref={containerRef}>
                {imageDT?.map((image, index) => (
                    <img key={index} src={image.link} alt={`Image ${index + 1}`} style={{ minWidth: '100%', minHeight: '50vh', objectFit: 'cover', scrollSnapAlign: 'start' }} />
                ))}
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <div style={{ position: 'absolute', zIndex: 1000, display: 'flex', transform: 'translateY(-5vh)' }}>
                    {[...Array(imageDT.length).keys()].map((index) => (
                        <div key={index} style={{ width: '15px', height: '3px', backgroundColor: currentIndex === index ? 'rgb(22, 94, 154)' : 'white', marginRight: '10px', cursor: 'pointer' }} onClick={() => scrollToIndex(index)} />
                    ))}
                </div>
            </div>
            <h1 style={{textAlign: 'center', marginTop: '50px'}}> News </h1>
            <new>
            Exciting news! We've just unveiled a delightful collection of new wines and cocktails, crafted right here in California, the epitome of wine country excellence. With meticulous attention to detail and a passion for perfection, our artisanal creations embody the essence of the Golden State's renowned viticulture. From rich and robust reds to crisp and refreshing whites, each sip transports you to the sun-kissed vineyards of California. Join us on a journey of flavor and discovery as we redefine what it means to enjoy fine wine and cocktails, all from the comfort of your own glass. Cheers to new beginnings and unforgettable tastes!
            </new>
        </div>
     );
}

export default WineNews;

const imageDT = [
    {
        link: "https://images.pexels.com/photos/616836/pexels-photo-616836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        link: 'https://images.pexels.com/photos/357742/pexels-photo-357742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        link: "https://images.pexels.com/photos/6614284/pexels-photo-6614284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        link: 'https://images.pexels.com/photos/1516418/pexels-photo-1516418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        link: "https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
]