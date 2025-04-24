import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../features/cart/cartSlice";
import ItemInCart from "../cart/ItemInCart";
import { Link } from "react-router-dom";
import styles from './SideCart.module.css'

const SideCart = () => {
    const cart = useSelector(selectCart);

    return (
        <div className={styles.sideCart}>
            <h3 className={styles.header}>Your Cart</h3>
            <div className={styles.content}>
                {cart.length === 0 ? (
                    <p className={styles.empty}>Your cart is empty</p>
                ) : (
                    <div className={styles.items}>
                        {cart.map((item) => (
                            <ItemInCart key={item.objectID} item={item} />
                        ))}
                    </div>
                )}
            </div>
            <Link to="/cart" className={styles.cartLink}>
                <button className={styles.button}>Go To Cart</button>
            </Link>
        </div>
    );
}


export default SideCart