import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectALLArtwork } from "../../features/artwork/gatherArtworkSlice";
import { addToCart } from "../../features/cart/cartSlice";
import styles from './ArtworkItem.module.css';

const ArtworkItem = () => {
    const { ID } = useParams();
    const artwork = useSelector(selectALLArtwork);
    const dispatch = useDispatch();

    if (!artwork[ID]) {
        return <div className={styles.error}>Artwork not found</div>;
    }

    const handleClick = () => {
        dispatch(addToCart(artwork[ID]))
    }

    return (
        <div className={styles.artworkContainer}>
            <div className={styles.headingContainer}>
                <h1>{artwork[ID].title}</h1>
                <h2>{artwork[ID].artistDisplayName || 'Unknown Artist'}</h2>
            </div>
            <div className={styles.contentContainer}>
                <img
                    src={artwork[ID].primaryImage}
                    alt={artwork[ID].title}
                    className={styles.artworkImage}
                />
                <div className={styles.infoContainer}>
                    <div className={styles.itemInformationContainer}>
                        <h4>Item Information</h4>
                        <div className={styles.informationContainer}>
                            <h5>Culture: <span>{artwork[ID].culture || 'N/A'}</span></h5>
                            <h5>Date of Creation: <span>{artwork[ID].objectDate || 'N/A'}</span></h5>
                            <div className={styles.originContainer}>
                                <h5>Origin</h5>
                                <p>Region: <span>{artwork[ID].region || 'N/A'}</span></p>
                                <p>Country: <span>{artwork[ID].country || 'N/A'}</span></p>
                                <p>City: <span>{artwork[ID].city || 'N/A'}</span></p>
                            </div>
                            <h5>Item Dimensions: <span>{artwork[ID].dimensions || 'N/A'}</span></h5>
                        </div>
                    </div>
                    <div className={styles.artistInformationContainer}>
                        <h4>Artist Information</h4>
                        <div className={styles.artistContainer}>
                            <h5>Name: <span>{artwork[ID].artistDisplayName || 'N/A'}</span></h5>
                            <h5>Nationality: <span>{artwork[ID].artistNationality || 'N/A'}</span></h5>
                            <h5>Born: <span>{artwork[ID].artistBeginDate || 'N/A'}</span></h5>
                            <h5>Died: <span>{artwork[ID].artistEndDate || 'N/A'}</span></h5>
                            <h5>Artist Bio: <span>{artwork[ID].artistDisplayBio || 'N/A'}</span></h5>
                        </div>
                    </div>
                    <div className={styles.priceContainer}>
                        <h4>Price</h4>
                        <h2>${artwork[ID].price}</h2>
                    </div>
                    <button type="button" className={styles.cartButton} onClick={handleClick} >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtworkItem;