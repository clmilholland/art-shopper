import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectAllArtworkIDs,
    selectAllArtwork,
    getArtwork,
    getArtworkIDs,
    selectHasFetchedArtworkIDs,
    selectHasDispatchedAllArtwork,
    selectHasAllArtworkData,
    resetLoadState,
    selectLoading,
    selectError,
} from "./gatherArtworkSlice";
import Artwork from "../../components/artwork/Artwork";
import styles from './GatherArtwork.module.css';
import SideFilter from "../../components/sideFilter/SideFilter";
import FilteredArtwork from "../filteredArtwork/FilteredArtwork";
import { selectActiveFilters } from "../filteredArtwork/filteredArtworkSlice";

const gatheringArtworkIDs = new Set();

const GatherArtwork = () => {
    const dispatch = useDispatch();
    const artworkIDs = useSelector(selectAllArtworkIDs);
    const artwork = useSelector(selectAllArtwork);
    const hasFetchedArtworkIDs = useSelector(selectHasFetchedArtworkIDs);
    const hasDispatchedAllArtwork = useSelector(selectHasDispatchedAllArtwork);
    const hasAllArtworkData = useSelector(selectHasAllArtworkData);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const activeFilters = useSelector(selectActiveFilters);
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        if (activeFilters.length > 0) {
            setIsFiltered(true);
        } else {
            setIsFiltered(false);
        }
    }, [activeFilters]);

    useEffect(() => {
        if (!hasFetchedArtworkIDs && !gatheringArtworkIDs.has('fetching')) {
            gatheringArtworkIDs.add('fetching');
            dispatch(getArtworkIDs()).finally(() => {
                gatheringArtworkIDs.delete('fetching');
            });
        }
    }, [dispatch, hasFetchedArtworkIDs]);

    useEffect(() => {
        if (artworkIDs.length > 0 && !hasDispatchedAllArtwork) {
            artworkIDs.forEach((id) => {
                dispatch(getArtwork(id));
            });
        }
    }, [artworkIDs, dispatch, hasDispatchedAllArtwork]);

    const artworkToDisplay = () => {
        const artworkList = artworkIDs
            .map((id) => artwork[id])
            .filter((artwork) => artwork && artwork.primaryImageSmall?.length > 0);

        if (!isFiltered) {
            return artworkList.map((artwork) => (
                <Artwork key={artwork.id} artwork={artwork} />
            ));
        }
        return <FilteredArtwork activeFilters={activeFilters} artworkList={artworkList} />;
    };

    const handleRefresh = useCallback(() => {
        dispatch(resetLoadState());
        gatheringArtworkIDs.clear();
    }, [dispatch]);


    return (
        <div className={styles.container}>
            <SideFilter
                setIsFiltered={setIsFiltered}
                artwork={artwork}
                className={styles.sideFilter}
            />
            <div className={styles.artworkContainer}>
                {hasAllArtworkData && !isFiltered ? (
                    <button onClick={handleRefresh} className={styles.refreshButton}>
                        Refresh Artwork
                    </button>
                ) : null}
                <div className={styles.grid}>
                    {error ? (
                        <p className={styles.error}>Error: {error}</p>
                    ) : loading || !hasAllArtworkData ? (
                        <p className={styles.loading}>Loading...</p>
                    ) : (
                        artworkToDisplay()
                    )}
                </div>
            </div>
        </div>
    );
};

export default GatherArtwork;
