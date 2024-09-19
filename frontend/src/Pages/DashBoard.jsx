import React, { useState, useEffect } from 'react';
import './CSS/DashBoard.css';
import Navbar from '../Components/Navbar/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import Publish from '../Components/Publish/Publish';
import UserPost from '../Components/UserPost/UserPost';
import { useParams } from 'react-router-dom';

const DashBoard = () => {
    const [user, setUser] = useState(null);
    const [friendposts, setFriendPosts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5001/dashboard/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setUser(data.user);
                        setFriendPosts(data.user.Freindposts)
                    } else {
                        console.error('Failed to fetch user data:', data.error);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [id]);

    console.log("user:", user);

    return (
        <div>
            <Navbar />
            <div className="publish-container">
                <Sidebar user={user} />
                <div className="publish-post">
                    <Publish user={user} setUser={setUser} />
                    <UserPost user={user} friendposts={friendposts} />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
