import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addToCultureFilters,
    clearCultureFilters,
    addToActiveFilters,
    removeFromActiveFilters,
    selectActiveFilters,
    selectCultureFilters,
} from "../../features/filteredArtwork/filteredArtworkSlice";
import styles from './SideFilter.module.css';

const SideFilter = ({ setIsFiltered, artwork, className }) => {
    const dispatch = useDispatch();
    const cultureFilters = useSelector(selectCultureFilters);
    const activeFilters = useSelector(selectActiveFilters);

    const priceInputRef = useRef(null);
    const endDateInputRef = useRef(null);

    // Update isFiltered based on activeFilters
    useEffect(() => {
        setIsFiltered(activeFilters.length > 0);
    }, [activeFilters, setIsFiltered]);

    const handleSetFilter = (event) => {
        const { id, type, checked, dataset } = event.target;
        const action = dataset.action || "apply";

        let value;
        if (id === "price" && priceInputRef.current) {
            value = priceInputRef.current.value;
        } else if (id === "endDate" && endDateInputRef.current) {
            value = endDateInputRef.current.value;
        } else {
            value = event.target.value;
        }

        const parsedValue = isNaN(value) ? value : Number(value);

        if (type === "checkbox" && id === "culture") {
            if (checked) {
                dispatch(addToActiveFilters({ id, value: parsedValue }));
            } else {
                dispatch(removeFromActiveFilters({ id, value: parsedValue }));
            }
        } else if (id === "price" || id === "endDate") {
            if (action === "remove") {
                const currentValue = activeFilters.find((filter) => filter.id === id)?.value || "";
                dispatch(removeFromActiveFilters({ id, value: currentValue }));
                if (id === "price" && priceInputRef.current) {
                    priceInputRef.current.value = "";
                } else if (id === "endDate" && endDateInputRef.current) {
                    endDateInputRef.current.value = "";
                }
            } else {
                const filterExists = activeFilters.some(
                    (filter) => filter.id === id && filter.value === parsedValue
                );
                if (!filterExists && value) {
                    dispatch(addToActiveFilters({ id, value: parsedValue }));
                } else {
                    dispatch(removeFromActiveFilters({ id, value: parsedValue }));
                }
            }
        }
    };

    useEffect(() => {
        dispatch(clearCultureFilters());
        const cultures = new Set();

        Object.values(artwork).forEach((item) => {
            if (item.culture?.length > 0 && item.primaryImage?.length) {
                cultures.add(item.culture);
            } else if (item.culture?.length === 0) {
                cultures.add("unknown");
            }
        });

        cultures.forEach((culture) => {
            dispatch(addToCultureFilters(culture));
        });
    }, [artwork, dispatch]);

    // Debug: Log when the component renders
    console.log("SideFilter rendering with className:", className);
    return (
        <div className={styles.sideFilter}>
            <h3 className={styles.header}>Filter Artwork</h3>
            <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Filter by Culture</label>
                <div className={styles.filterOptions}>
                    {cultureFilters.map((culture) => (
                        <label key={culture} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                id="culture"
                                value={culture}
                                checked={activeFilters.some(
                                    (filter) => filter.id === "culture" && filter.value === culture
                                )}
                                onChange={handleSetFilter}
                                className={styles.checkbox}
                            />
                            <span className={styles.labelText}>{culture}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Max Price</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Enter max price"
                    className={styles.filterInput}
                    onChange={(e) => (e.target.value = e.target.value.replace(/^0+/, ""))}
                    ref={priceInputRef}
                />
                <button
                    type="button"
                    id="price"
                    onClick={handleSetFilter}
                    className={styles.submitButton}
                >
                    Apply
                </button>
                {activeFilters.some((filter) => filter.id === "price") && (
                    <span
                        id="price"
                        data-action="remove"
                        onClick={handleSetFilter}
                        className={styles.removeLink}
                    >
                        Remove
                    </span>
                )}
            </div>
            <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Max End Date</label>
                <input
                    id="endDate"
                    name="endDate"
                    type="number"
                    placeholder="Enter max date"
                    className={styles.filterInput}
                    onChange={(e) => (e.target.value = e.target.value.replace(/^0+/, ""))}
                    ref={endDateInputRef}
                />
                <button
                    type="button"
                    id="endDate"
                    onClick={handleSetFilter}
                    className={styles.submitButton}
                >
                    Apply
                </button>
                {activeFilters.some((filter) => filter.id === "endDate") && (
                    <span
                        id="endDate"
                        data-action="remove"
                        onClick={handleSetFilter}
                        className={styles.removeLink}
                    >
                        Remove
                    </span>
                )}
            </div>
        </div>
    );
};

export default SideFilter;