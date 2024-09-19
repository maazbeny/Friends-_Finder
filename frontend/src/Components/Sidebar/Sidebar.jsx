import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import user_img from '../Assets/user-img.jpg';
import { useParams } from 'react-router-dom';

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5001/dashboard/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setUser(data.user);
                    setUserImage(data.user.userImage || user_img);
                }
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, [id]);

    const getImageUrl = (file) => {
        return URL.createObjectURL(file);
    };

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImageUrl = getImageUrl(file);
            setUserImage(newImageUrl);

            const formData = new FormData();
            formData.append("product", file);

            fetch("http://localhost:5001/upload", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            })
                .then(response => response.json())
                .then(uploadData => {
                    if (uploadData.success) {
                        return fetch(`http://localhost:5001/addimage/${id}`, {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ userImage: uploadData.image_url }),
                        });
                    }
                })
                .then(response => response.json())
                .then(updateData => {
                    if (updateData.success) {
                        setUser(prevUser => ({
                            ...prevUser,
                            userImage: updateData.userImage
                        }));
                        window.location.reload()
                    }
                })
                .catch(error => console.error('Error uploading image:', error));
        }
    };

    return (
        <div className='sidebar'>
            <div className="sidebar-head">
                <div className="image-username">
                    <div className="user-img">
                        <label htmlFor="file-input">
                            <img
                                src={userImage || user_img}
                                className='addproduct-thumbnail-img'
                                alt="User"
                            />
                        </label>
                        <input
                            onChange={imageHandler}
                            type="file"
                            name='image'
                            id='file-input'
                            hidden
                        />
                    </div>
                    <div className="username-followers">
                        <h1>{user ? user.username : 'Loading...'}</h1>
                        <div className="followers">
                            <i className="fa-solid fa-user-plus"></i>
                            <p>1,2399 followers</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-menu">
                <div className="sidebar-menus">
                    <i className="fa-solid fa-newspaper"></i>
                    <li>My Newsfeed</li>
                </div>
                <hr />
                <div className="sidebar-menus">
                    <i className="fa-solid fa-users"></i>
                    <li>People Nearby</li>
                </div>
                <hr />
                <div className="sidebar-menus">
                    <i className="fa-solid fa-user-group"></i>
                    <li>Friends</li>
                </div>
                <hr />
                <div className="sidebar-menus">
                    <i className="fa-solid fa-message"></i>
                    <li>Messages</li>
                </div>
                <hr />
                <div className="sidebar-menus">
                    <i className="fa-regular fa-images"></i>
                    <li>Images</li>
                </div>
                <hr />
                <div className="sidebar-menus">
                    <i className="fa-solid fa-video"></i>
                    <li>Videos</li>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Sidebar;
