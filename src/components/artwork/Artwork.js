import React from 'react';
import styles from './Artwork.module.css';
import {Link} from 'react-router-dom';

const Artwork = ({ artwork }) => {

    return (
        <Link to={`/artwork/${artwork.objectID}`} className={styles.artworkContainer}>
            <h1 className={styles.artworkTitle}>{artwork.title}</h1>
            <h4 className={styles.artistName} >Artist: {artwork.artistDisplayName}</h4>
            <h4 className={styles.artworkPrice} >Price: ${artwork.price}</h4>
            <img src={artwork.primaryImage} className={styles.artworkImage}></img>
        </Link>
    );
};

export default Artwork;