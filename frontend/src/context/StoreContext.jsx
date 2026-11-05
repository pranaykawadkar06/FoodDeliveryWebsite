import { createContext } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import { useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    
    const [cartItems, setCartItems] = useState({});

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


    
    console.log(cartItems);
    console.log(cartTotal);
    

    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        cartItems,
        cartTotal
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;