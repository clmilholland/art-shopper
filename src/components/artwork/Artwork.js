import React from 'react';
import styles from './Artwork.module.css';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, addToCart } from '../../features/cart/cartSlice';

const Artwork = ({ artwork }) => {
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();


    const isItemInCart = cart.some(item => item.objectID === artwork.objectID);

    const handleClick = () => {
            dispatch(addToCart(artwork))
    }

    return (
        <div className={styles.artworkContainer}>
            <Link to={`/artwork/${artwork.objectID}`} className={styles.artworkLink}>
                <h1 className={styles.artworkTitle}>{artwork.title}</h1>
                <h4 className={styles.date}>Date: {artwork.objectDate}</h4>
                <img src={artwork.primaryImage} className={styles.artworkImage} alt={artwork.title} />
                <h4 className={styles.artworkPrice}>Price: ${artwork.price}</h4>
            </Link>
            <button
                type="button"
                className={styles.cartButton}
                onClick={handleClick}
                disabled={isItemInCart}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default Artwork;