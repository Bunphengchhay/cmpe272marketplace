import '../styles/contact.css';
function Contact() {

    return ( 
        <div style={{width: '100%', height: '100%'}}>
            <div className="contactbackground">
                <div className="contact-child12">
                    <div className="contact-child1">
                        <div style={{textAlign: 'center'}}>
                            <h1> Welcome to the Hub</h1>
                            <p> Shop any where </p>
                        </div>
                    </div>
                    <div className="contact-child2">
                            <div style={{textAlign: 'center'}}>
                            <h1> Call Us or Email Us </h1>
                            <p> FirstName LastName</p>
                            <p> 123456789 </p>
                            <p> email@email.com</p>
                            </div>
                    </div>
                </div>
                <div className="contact-child3">
                    <video className="background-video" src="https://videos.pexels.com/video-files/2675511/2675511-hd_1920_1080_24fps.mp4" autoPlay loop muted></video>
                </div>

            </div>
            {/* <p> Information </p> */}
        </div>
     );
}

export default Contact;