import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [userPosts, setUsersPosts] = useState([]);
    const [user, setAllUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {


            if (id) {
                let responseData;
                await fetch(`http://localhost:5001/post/${id}`)
                    .then((resp) => resp.json())
                    .then((data) => responseData = data)
                if (responseData.success) {
                    setUsersPosts([responseData.user.posts])
                    setAllUser(responseData.user)
                    console.log(user)
                }
                else {
                    alert("user not found")
                }
            }


        }
        fetchData()
    }, []);

    const contextValue = { userPosts, user };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

