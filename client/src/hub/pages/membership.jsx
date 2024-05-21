import { useEffect, useState } from "react";
import { endpoint } from '../config/config.js';
import '../styles/membership.css';
import { useAuth } from "../function/authentication.jsx";

function Membership() {
    const [membership, setMembership] = useState(JSON.parse(sessionStorage.getItem('membership')))|| ([]);
    const [searchQuery, setSearchQuery] = useState('');
    const {toggleLogon} = useAuth();

    useEffect(() => {
        if (!membership) {
            fetchMembership();
        }
    })
    useEffect(() => {
        if(toggleLogon === 'Logout' && membership.length <0) {
        fetchMembership();
        console.log('membership is fetched');
        }
        console.log('membership is not fetched');
    }, [toggleLogon]);

    const fetchMembership = () => {
        fetch(`${endpoint}/getMembers`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log('Data from database:', data);
                sessionStorage.setItem('membership', JSON.stringify(data));
                setMembership(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredMembership = membership?.users?.filter((user) => {
        const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });


    return ( 
        <div>
        <h4 style={{textAlign: 'center', margin: '50px'}}>List of Our Membership</h4>
        <div className="searchBar">
            <p style={{margin: '10px'}}> Search |</p>
            <input type="text" placeholder="Search by name" onChange={handleSearchChange} />
        </div>
        <div className="membership-table">
            <table>
                <thead>
                    <tr className="tablebar">
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Home Address</th>
                        <th>Home Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {membership && filteredMembership?.map((user, index) => (
                        <tr key={index}>
                            <td> {user.id} </td>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.home_address}</td>
                            <td>{user.home_phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    

    );
}

export default Membership;