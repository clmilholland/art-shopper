import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { selectCart } from "../../features/cart/cartSlice";
import { useSelector } from "react-redux";
import styles from './Header.module.css';
import ArtriaLogoCropped from '../../images/ArtriaLogoCropped.webp';

const Header = () => {
    const cart = useSelector(selectCart);
    const cartCount = cart.length;
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen((prev) => !prev);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h2 className={styles.logoText}>ARTRIA</h2>
                <img src={ArtriaLogoCropped} alt="Artria logo" />
            </div>
            <button
                className={styles.menuToggle}
                onClick={toggleNav}
                aria-label={isNavOpen ? "Close menu" : "Open menu"}
                aria-expanded={isNavOpen}
            >
                {isNavOpen ? "✕" : "☰"}
            </button>
            <div className={`${styles.rightSection} ${isNavOpen ? styles.active : ""}`}>
                <nav className={styles.nav}>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                        Home
                    </NavLink>
                    <NavLink to="/artwork" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                        Artwork
                    </NavLink>
                    <NavLink to="/contactUs" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                        Contact Us
                    </NavLink>
                </nav>
                <NavLink to="/cart" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                    <div className={styles.cartContainer}>
                        Cart
                        <FaCartShopping className={styles.cartIcon} />
                        {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
                    </div>
                </NavLink>
            </div>
        </header>
    );
};

export default Header;