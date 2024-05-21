import "../styles/home.css"
function Footer() {
    return (
        <footer style={{color: 'rgb(22, 94, 154)'}}>
            <div className="affiliation">
                <p style={{fontSize: 'small'}}>
                    © All Rights Reserved CMPE272 Spring 2024
                </p>
                <p style={{fontSize: 'small'}}> San Jose State University</p>
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}> 
                <div style={{backgroundColor:'rgb(22, 94, 154)', width: '98%', height: '1px'}}/>
            </div>
            <div style={{margin: '10px', fontSize: '9px'}}>
                <p>Disclaimer: This project is created for educational purposes only. All images, videos, and descriptions used herein are the property of their respective copyright holders. This content is used under fair use for academic and non-commercial educational purposes. We do not claim ownership of any copyrighted materials used in this project.</p>
            </div>
        </footer>
     );
}

export default Footer;