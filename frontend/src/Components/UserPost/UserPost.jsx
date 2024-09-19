import React from 'react';
import Posting from '../Posting/Posting.jsx';

const UserPost = ({ user, friendposts }) => {
  if (!user || !user.posts) {
    return <div>No posts available</div>;
  }


  return (
    <div>
     
      {user.posts.length > 0 ? (
        user.posts.map(post => (
          post ? (
            <Posting key={post._id} id={post._id} image={post.image} des={post.des} user={user} date={post.createdAt} friend={post.friend} />
          ) : null
        ))
      ) : (
        <div>No posts found</div>
      )}
    </div>
  );
};

export default UserPost;
