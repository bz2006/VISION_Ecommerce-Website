import React, { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth";
import axios from "axios";
//import { useNavigate, useParams } from "react-router-dom";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartlen, setCartLen] = useState(0);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (cart.length > cartlen) {
      const combinedCart = combineCartItems(cart);
      setCart(combinedCart);
      setCartLen(cart.length)
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    //eslint-disable-next-line
  }, [cart]);

  useEffect(() => {
    if (!auth.user) {
    } else {
      syncCartWithServer();
    }
  }, [auth.user, cart]); // added cart to the dependency array
  

  const combineCartItems = (cartItems) => {
    const combiner = [];
    const ids = [];

    for (let v of cartItems) {
      if (!ids.includes(v[0])) {
        ids.push(v[0]);
        combiner.push(v);
      } else {
        for (let c of combiner) {
          if (v[0] === c[0]) {
            c[4] = c[4] + v[4];
          }
        }
      }
    }
    return combiner;
  };

  const syncCartWithServer = async () => {
    try {
      // Assuming your server expects cart data in a specific format
      const cartData = {items: []};
      for (let arr of cart) {
        cartData.items.push({
          product: arr[0],
          name: arr[1],
          mrp: arr[3],
          quantity: arr[4]
        });
      }
      await axios.put(`/api/v1/cart/create-up-cart/${auth.user._id}`, cartData);
      console.log("Cart synced with server successfully.");
    } catch (error) {
      console.error("Error syncing cart with server:", error);
    }
  };


  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
