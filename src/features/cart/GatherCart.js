import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCart } from "./cartSlice";
import ItemInCart from "../../components/cart/ItemInCart";
import styles from './GatherCart.module.css'
import { Link } from "react-router-dom";

const GatherCart = () => {
    const cart = useSelector(selectCart);
    console.log(cart)

    const getCartTotal = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.price
        })
        return <p>${total}</p>
    }

    return (
        <div className={styles.cartContainer} >
            <h1>Cart</h1>
            <div className={styles.cartItemContainer}>
                {cart.length > 0 ?
                    cart.map((item) => {
                        return <ItemInCart key={item.objectID} item={item}/>
                    })
                    : <h5 className={styles.emptyCart}>Cart Is Empty</h5>
                }
            </div>
            <h2>Total: {getCartTotal()}</h2>
            <Link to={'/checkout'} >
                <button type="button">Check Out</button>
            </Link>
        </div>
    )

}

export default GatherCart;