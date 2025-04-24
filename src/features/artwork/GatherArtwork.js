import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllArtworkIDs, selectALLArtwork, getArtwork, getArtworkIDs } from "./gatherArtworkSlice";
import Artwork from "../../components/artwork/Artwork";
import styles from './GatherArtwork.module.css';

const gatheringArtworkIDs = new Set();

const GatherArtwork = () => {
    const dispatch = useDispatch();
    const artworkIDs = useSelector(selectAllArtworkIDs);
    const artwork = useSelector(selectALLArtwork);
    const [hasFetchedArtworkIDs, setHasFetchedArtworkIDs] = useState(false);
    const [hasDispatchedAllArtwork, setHasDispatchedAllArtwork] = useState(false);
    const [hasAllArtworkData, setHasAllArtworkData] = useState(false);

    // Fetch artworkIDs on component mount, but only once
    useEffect(() => {
        if (!hasFetchedArtworkIDs && !gatheringArtworkIDs.has('fetching')) {
            gatheringArtworkIDs.add('fetching');
            dispatch(getArtworkIDs()).finally(() => {
                setHasFetchedArtworkIDs(true);
                gatheringArtworkIDs.delete('fetching');
            });
        }
    }, [dispatch, hasFetchedArtworkIDs]);

    // Fetch artwork data for each ID when artworkIDs are available
    useEffect(() => {
        if (artworkIDs.length === 80 && !hasDispatchedAllArtwork) {
            let dispatchCount = 0;
            artworkIDs.forEach((id) => {
                dispatch(getArtwork(id)).finally(() => {
                    dispatchCount += 1;
                    if (dispatchCount === artworkIDs.length) {
                        setHasDispatchedAllArtwork(true);
                    }
                });
            });
        }
    }, [artworkIDs, dispatch, hasDispatchedAllArtwork]);

    // Check if all artwork data has been fetched
    useEffect(() => {
        if (hasDispatchedAllArtwork && Object.keys(artwork).length >= artworkIDs.length) {
            setHasAllArtworkData(true);
        }
    }, [artwork, hasDispatchedAllArtwork, artworkIDs.length]);

    return (
        <div className={styles.container}>
            {hasAllArtworkData ? (
                <div className={styles.grid}>
                    {artworkIDs.map((id) => {
                        if (artwork[id] && artwork[id].primaryImage.length > 0) {
                            console.log(`Mapping Artwork for ID ${id}, artwork data:`, artwork[id]);
                            return <Artwork key={id} artwork={artwork[id]} />;
                        }
                        return null; // Return null if the artwork doesn't meet the condition
                    })}
                </div>
            ) : (
                <p className={styles.loading}>Loading...</p>
            )}
        </div>
    );
};

export default GatherArtwork;