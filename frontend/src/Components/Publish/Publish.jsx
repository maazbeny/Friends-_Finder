import React, { useState } from 'react';
import user_img from '../Assets/user-img.jpg';
import './Publish.css';

const Publish = ({ user, setUser }) => {
    const [image, setImage] = useState(null);
    const [postDetails, setPostDetails] = useState({
        image: "",
        des: "",
        video: "",
        friend: ""
    });

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setPostDetails(prevDetails => ({
                ...prevDetails,
                image: file
            }));
        }
    };

    const onChangeHandler = (e) => {
        setPostDetails(prevDetails => ({
            ...prevDetails,
            [e.target.name]: e.target.value
        }));
    };

    const removeImage = () => {
        setImage(null);
        setPostDetails(prevDetails => ({
            ...prevDetails,
            image: ""
        }));
    };

    const addUserData = () => {
        const formData = new FormData();
        if (postDetails.image) {
            formData.append('product', postDetails.image);

            fetch('http://localhost:5001/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            })
                .then(response => response.json())
                .then(uploadData => {
                    if (uploadData.success) {
                        return fetch(`http://localhost:5001/adddata/${user._id}`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ ...postDetails, image: uploadData.image_url }),
                        });
                    } else {
                        throw new Error('Image upload failed');
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Product Added");
                        setUser(prevUser => ({
                            ...prevUser,
                            posts: [...prevUser.posts, data.post]
                        }));
                    } else {
                        alert("Failed to add post");
                    }
                    resetForm();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert(`An error occurred: ${error.message}`);
                });
        } else {
            fetch(`http://localhost:5001/adddata/${user._id}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postDetails),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Post Added");
                        setUser(prevUser => ({
                            ...prevUser,
                            posts: [...prevUser.posts, data.post]
                        }));
                    } else {
                        alert("Failed to add post");
                    }
                    resetForm();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert(`An error occurred: ${error.message}`);
                });
        }
    };

    const resetForm = () => {
        setPostDetails({
            image: "",
            des: "",
            video: "",
        });
        setImage(null);
    };

    return (
        <div className="container">
            <div className='publish'>
                <div className="publish-area">
                    <img className='user-pic' src={user?.userImage || user_img} alt="User" />
                    <div className='text-area'>
                        <textarea
                            value={postDetails.des}
                            name="des"
                            placeholder='Write what you wish'
                            onChange={onChangeHandler}
                        ></textarea>
                        {image && (
                            <div className="image-preview-container">
                                <img src={image} alt="Preview" className="image-preview" />
                                <div className="cross">
                                    <i className='close-icon' onClick={removeImage}>x</i>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="publish-inputs">
                    <label htmlFor="textarea" className="publish-icons">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </label>
                    <label htmlFor="imageUpload" className="publish-icons">
                        <i className="fa-regular fa-image"></i>
                        <input
                            onChange={imageHandler}
                            type="file"
                            id="imageUpload"
                            name="image"
                            accept="image/*"
                            hidden
                        />
                    </label>
                    <label htmlFor="videoUpload" className="publish-icons">
                        <i className="fa-solid fa-video"></i>
                    </label>
                    <div>
                        <button onClick={addUserData} className='publish-btn'>Publish</button>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default Publish;
