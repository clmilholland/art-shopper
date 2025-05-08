import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCart } from "./cartSlice";
import ItemInCart from "../../components/cart/ItemInCart";
import styles from './GatherCart.module.css';
import { Link } from "react-router-dom";

const GatherCart = () => {
    const cart = useSelector(selectCart);
    console.log(cart);

    const getCartTotal = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.price;
        });
        return <span>${total}</span>;
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.cartContainer}>
                <h1>Cart</h1>
                <div className={styles.cartItemContainer}>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <ItemInCart key={item.objectID} item={item} />
                        ))
                    ) : (
                        <h5 className={styles.emptyCart}>Cart Is Empty</h5>
                    )}
                    <h2>Total: {getCartTotal()}</h2>
                    <div className={styles.buttonContainer}>
                        <Link to={'/checkout'}>
                            <button type="button" className={styles.checkoutButton}>
                                Check Out
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GatherCart;