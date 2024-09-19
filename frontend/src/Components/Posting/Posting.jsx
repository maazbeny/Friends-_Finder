import React, { useState } from 'react';
import './Posting.css';
import { formatDistanceToNow } from 'date-fns';
import { useParams } from 'react-router-dom';
import user_img from '../Assets/user-img.jpg';



const Posting = (props) => {
    
    const [username, setUsername] = useState("")
    const onchangehandler = (e) => {
        setUsername(e.target.value)
        console.log(username)
    }
    const { image, des, user, date, id, friend } = props;
    const formattedDate = date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : 'Date not available';
    console.log("id", id)
    console.log("user", user)
    const Search = async (postId) => {

        let responseData;
        await fetch(`http://localhost:5001/search`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, postId, user })
        }).then((resp) => resp.json()).then((data) => responseData = data)
        console.log(responseData);

        if (responseData.success) {
           
            alert('Posts have been added to the friend\'s dashboard');
        } else {

            console.log(responseData.error);
        }

    }

    const DeletePost = async (postId) => {
        let responseData;
        await fetch("http://localhost:5001/deletepost", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ postId }),
        }).then((resp) => resp.json()).then((data) => responseData = data)
        if (responseData.success) {

            alert('Post deleted');

        } else {

            console.log(responseData.error);
        }

    }
    return (
        <div className='posting'>
            <img className='post-image' src={image} alt="" />
            <div className="post-publisher">
                <img src={user?.userImage ? user.userImage : user_img} alt="" />

                <div className="username-publish-time">
                    <div className="follow-username">
                        <h1>{user?.username}</h1>
                        <p>following</p>

                    </div>
                    <div className="show-date">
                        <div className="share-date">
                            <p>{formattedDate}</p>
                            {friend && <p className="shared-post">{friend}</p>}
                        </div>

                    </div>
                </div>
            </div>
            <hr />
            <p className='post-description'>{des}</p>
            <div className="show-delete">
                <button className='show-btn' onClick={() => DeletePost(id)} >Delete </button>
                <div className="show-input">

                    <input value={username} placeholder='Show to my friend' onChange={onchangehandler} type="text" />
                    <button className='show-btn' onClick={() => Search(id)} >Show </button>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Posting;
