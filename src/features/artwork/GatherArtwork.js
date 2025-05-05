import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllArtworkIDs, selectALLArtwork, getArtwork, getArtworkIDs } from "./gatherArtworkSlice";
import Artwork from "../../components/artwork/Artwork";
import styles from './GatherArtwork.module.css';
import SideCart from "../../components/sideCart/SideCart";
import SideFilter from "../../components/sideFilter/SideFilter";
import FilteredArtwork from "../filteredArtwork/FilteredArtwork";
import { selectActiveFilters } from "../filteredArtwork/filteredArtworkSlice";

const gatheringArtworkIDs = new Set();

const GatherArtwork = () => {
    const dispatch = useDispatch();
    const artworkIDs = useSelector(selectAllArtworkIDs);
    const artwork = useSelector(selectALLArtwork);
    const activeFilters = useSelector(selectActiveFilters);
    const [hasFetchedArtworkIDs, setHasFetchedArtworkIDs] = useState(false);
    const [hasDispatchedAllArtwork, setHasDispatchedAllArtwork] = useState(false);
    const [hasAllArtworkData, setHasAllArtworkData] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [filterType, setFilterType] = useState(null);
    const [filterValue, setFilterValue] = useState(null);
    console.log(isFiltered)
    console.log(filterType)
    console.log(filterValue)
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

    const artworkToDisplay = () => {

        // Map artworkIDs to artwork objects, filtering out invalid entries
        const artworkList = artworkIDs
        .map((id) => artwork[id])
        .filter((artwork) => artwork && artwork.primaryImage?.length > 0);

        // console.log("Mapping Artwork for IDs: ", artworkIDs, " artwork data: ", artworkList, "Active Filters: ", activeFilters);
        // If not filtered, display all valid artwork
        if (!isFiltered) {
            return artworkList.map((artwork) => (
                <Artwork key={artwork.id} artwork={artwork} />
            ));
        }

        // If filtered, pass the artwork list and activeFilters to FilteredArtwork
        return <FilteredArtwork activeFilters={activeFilters} artworkList={artworkList} />;
    }

    // return artworkIDs.map((id) => {
    //     if (artwork[id] && artwork[id].primaryImage.length && !isFiltered > 0) {
    //         console.log('Artwork object:', Object.keys(artwork));
    //         console.log(`Mapping Artwork for ID ${id}, artwork data:`, artwork[id]);
    //         return <Artwork key={id} artwork={artwork[id]} />;
    //     } else if (artwork[id] && artwork[id].primaryImage.length) {
    //         return <FilteredArtwork artwork={artwork[id]} filterType={filterType} filterValue={filterValue} />
    //     } else {
    //     return null; // Return null if the artwork doesn't meet the condition
    //     }
    // })

    return (
        <div className={styles.container}>
            <SideFilter setIsFiltered={setIsFiltered} setFilterType={setFilterType} setFilterValue={setFilterValue} artwork={artwork}/>
            <div className={styles.grid}>
                {hasAllArtworkData ? (
                    artworkToDisplay()
                ) : (
                    <p className={styles.loading}>Loading...</p>
                )}
            </div>
            <SideCart />
        </div>
    );
};

export default GatherArtwork;