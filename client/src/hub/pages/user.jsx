import { useAuth } from '../function/authentication';
import { useNavigate } from 'react-router-dom';
function User() {
    const { user, logout} = useAuth();
    const navigate = useNavigate();
    const handleClick = async () => {
        logout();
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate('/login');
      };
      
    return ( 
        <div style={{width: '100%', height: '100%', marginTop: '50px',textAlign: 'center'}}>
            <h1 style={{margin: '50px'}}> Your Profile </h1>
            <p> Name: {user?.firstname} {user?.lastname}</p>
            <p> Email: {user?.email} </p>
            <p> Address: {user?.home_address}</p>
            <p> Phone: {user?.home_phone}</p>
            <div style={{width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <button onClick={handleClick}>Logout</button>
            </div>
        </div>
     );
}

export default User;