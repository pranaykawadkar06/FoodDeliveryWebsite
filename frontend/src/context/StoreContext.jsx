import axios from "axios";
import { createContext } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"; 
    
    const [token, setToken] = useState("");

    const [cartItems, setCartItems] = useState({});

    const [food_list, setFoodList] = useState([]);

    const navigate = useNavigate()


    useEffect(() => {
        const fetchFoodList = async () => {
            const response = await axios.get(`${url}/api/food/list`);

            if(response.data.success){
                setFoodList(response.data.data);
                console.log(food_list);
            }
            else{
                alert(response.data.message);
            }
        } 
        fetchFoodList();
    }, [])


    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]:1}))
        }
        else {
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
    }

    const cartTotal = () => {
        const total = food_list.reduce((itemsTotal, currItem) => {
            const quantity = cartItems[currItem._id] || 0;
            return itemsTotal + (quantity * currItem.price);
        }, 0);
        return total;
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        navigate("/")
    }, [])
    
    // console.log(cartItems);
    // console.log(cartTotal);
    
    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        cartItems,
        cartTotal, 
        url,
        token,
        setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;