import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectALLArtwork } from "../../features/artwork/gatherArtworkSlice";
import styles from './ArtworkItem.module.css';

const ArtworkItem = () => {
    const {ID} = useParams();
    const dispatch = useDispatch();
    const artwork = useSelector(selectALLArtwork)


    return (
        <div className={styles.artworkContainer}>
            <div className={styles.headingContainer}>
                <h1>Title: {artwork[ID].title}</h1>
                <h2>Artist: {artwork[ID].artistDisplayName}</h2>
            </div>
            <img src={artwork[ID].primaryImage} />
            <div className={styles.itemInformationContainer}>
                <h4>Item Information</h4>
                <div className={styles.informationContainer}>
                    <h5>Culture: {artwork[ID].culture}</h5>
                    <h5>Date of Creation: {artwork[ID].objectDate ? artwork[ID].objectDate : 'N/A'}</h5>
                    <div className={styles.originContainer}>
                        <h5>Origin</h5>
                        <p>Region: {artwork[ID].region ? artwork[ID].region : 'N/A'}</p>
                        <p>Country: {artwork[ID].country ? artwork[ID].country : 'N/A'}</p>
                        <p>City: {artwork[ID].city ? artwork[ID].city : 'N/A'}</p>
                    </div>
                    <h5>Item Dimensions: {artwork[ID].dimensions ? artwork[ID].dimensions : 'N/A'}</h5>
                </div>
            </div>
            <div className={styles.artistInformationContainer}>
                <h4>Artist Information</h4>
                <div className={styles.artistContainer}>
                    <h5>Nationality: {artwork[ID].artistNationality ? artwork[ID].artistNationality : 'N/A'}</h5>
                    <h5>Born: {artwork[ID].artistBeginDate ? artwork[ID].artistBeginDate : 'N/A'}</h5>
                    <h5>Died: {artwork[ID].artistEndDate ? artwork[ID].artistEndDate : 'N/A'}</h5>
                </div>
            </div>
            <button type="button" className={styles.cartButton}>Add To Cart</button>
            
        </div>
    )
}


export default ArtworkItem;