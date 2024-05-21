import '../styles/home.css'
import { Link, NavLink } from 'react-router-dom';
import thehub from '../artifact/thehub.png'
import About from './about';
function Home() {
    return ( 
    <div style={{width: '100%', height: 'auto'}} className='mainhome'>
        {/* <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center'}}> */}
            <div className="homebackground">
                    <div style={{width: '100%', height: 'auto'}}>
                    <div className="area" >
                    <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div class="context">
                        <div style={{textAlign: 'center', zIndex: 2}}>
                            <img src={thehub} width={250} height={250}/>
                            <h1>THE HuB </h1>
                            <h2> Everything You Need </h2>
                            <br/>
                            <NavLink to = '/products'> Shop Now </NavLink>
                        </div>
                        </div>
                    </div>
                            <ul className="circles">
                                    <li>The Hub</li>
                                    <li></li>
                                    <li> </li>
                                    <li> Wine</li>
                                    <li></li>
                                    <li></li>
                                    <li>Socks</li>
                                    <li></li>
                                    <li></li>
                                    <li>Crabs</li>
                            </ul>
                    </div>
                    </div>
            </div>    
               
        {/* </div> */}
        <About/>
    </div> );
}

export default Home;