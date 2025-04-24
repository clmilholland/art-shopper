import React from "react";
import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { selectCart } from "../../features/cart/cartSlice";
import { useSelector } from "react-redux";
import styles from './Header.module.css';

const Header = () => {
    const cart = useSelector(selectCart);
    const cartCount = cart.length

    return (
        <header className={styles.header}>
            <h2 className={styles.logo}>Art Shopper</h2>
            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/artwork"
                    className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                >
                    Artwork
                </NavLink>
                <NavLink
                    to="/contactUs"
                    className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                >
                    Contact Us
                </NavLink>
            </nav>
            <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
                <div className={styles.cartContainer}>
                    <FaCartShopping className={styles.cartIcon} />
                    {cartCount > 0 && (
                        <span className={styles.cartCount}>{cartCount}</span>
                    )}
                </div>
            </NavLink>
        </header>
    );
}

export default Header;