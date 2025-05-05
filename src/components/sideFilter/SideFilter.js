import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCultureFilters, clearCultureFilters, addToActiveFilters, removeFromActiveFilters, selectActiveFilters, selectCultureFilters } from "../../features/filteredArtwork/filteredArtworkSlice";
import styles from './SideFilter.module.css';

const SideFilter = ({setIsFiltered, artwork}) => {

    const dispatch = useDispatch();
    const cultureFilters = useSelector(selectCultureFilters);
    const activeFilters = useSelector(selectActiveFilters);
    console.log(cultureFilters)

    console.log("SideFilter - cultureFilters:", cultureFilters);
  console.log("SideFilter - activeFilters:", activeFilters);

  const priceInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const handleSetFilter = (event) => {
    setIsFiltered(true);
    const { id, type, checked, dataset } = event.target;
    const action = dataset.action || "apply"; // Default to "apply" if no action specified

    // Get the value from the appropriate input ref for price or endDate
    let value;
    if (id === "price" && priceInputRef.current) {
      value = priceInputRef.current.value;
    } else if (id === "endDate" && endDateInputRef.current) {
      value = endDateInputRef.current.value;
    } else {
      value = event.target.value; // For culture checkboxes
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

  return (
    <div className={styles.sideFilter}>
      {/* Header */}
      <h3 className={styles.header}>Filter Artwork</h3>

      {/* Culture Filter Section */}
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

      {/* Max Price Section */}
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

      {/* Max End Date Section */}
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

    // const handleSetFilter = (event) => {
    //     setIsFiltered(true);

    //     const value = event.target.value;
    //     const parsedValue = isNaN(value) ? value : Number(value);
    //     const id = event.target.id;

    //     // Check if a filter with the same id and value already exists
    //     const filterExists = activeFilters.some(
    //         (filter) => filter.id === id && filter.value === parsedValue
    //     );
        
    //     if(!filterExists) {
    //         dispatch(addToActiveFilters({id, value: parsedValue}))
    //     } else {
    //         dispatch(removeFromActiveFilters({id, value: parsedValue}))
    //     }
    // }

    // useEffect(() => {
    //     Object.keys(artwork).map((id) => {
    //         if(artwork[id].culture.length > 0 && artwork[id].primaryImage.length && !cultureFilters.includes(artwork[id].culture)) {
    //             dispatch(addToCultureFilters(artwork[id].culture))
    //         } else if (artwork[id].culture.length === 0 && !cultureFilters.includes('unknown')) {
    //           dispatch(addToCultureFilters('unknown'))
    //         }
    //         return null;
    //     })
    // })


    // return (
    //     <div className={styles.sideFilter}>
    //       {/* Header */}
    //       <h3 className={styles.header}>Filter Artwork</h3>
      
    //       {/* Culture Filter Section */}
    //       <div className={styles.filterSection}>
    //         <label className={styles.filterLabel}>Filter by Culture</label>
    //         <div className={styles.filterOptions}>
    //           {cultureFilters.map((culture) => (
    //             <button
    //               type="button"
    //               id="culture"
    //               value={culture}
    //               key={culture}
    //               onClick={handleSetFilter}
    //               className={styles.filterButton}
    //             >
    //               {culture}
    //             </button>
    //           ))}
    //         </div>
    //       </div>
      
    //       {/* Max Price Section */}
    //       <div className={styles.filterSection}>
    //         <label className={styles.filterLabel}>Max Price</label>
    //         <input
    //           id="price"
    //           name="price"
    //           type="number"
    //           placeholder="Enter max price"
    //           className={styles.filterInput}
    //         />
    //         <button
    //           type="button"
    //           value="price"
    //           onClick={handleSetFilter}
    //           className={styles.submitButton}
    //         >
    //           Apply Price Filter
    //         </button>
    //       </div>
      
    //       {/* Max End Date Section */}
    //       <div className={styles.filterSection}>
    //         <label className={styles.filterLabel}>Max End Date</label>
    //         <input
    //           id="endDate"
    //           name="endDate"
    //           type="number"
    //           placeholder="Enter max end date"
    //           className={styles.filterInput}
    //         />
    //         <button
    //           type="button"
    //           value="endDate"
    //           onClick={handleSetFilter}
    //           className={styles.submitButton}
    //         >
    //           Apply End Date Filter
    //         </button>
    //       </div>
      
    //       {/* Active Filters Section */}
    //       <div className={styles.filterSection}>
    //         <label className={styles.filterLabel}>Active Filters</label>
    //         <div className={styles.activeFilters}>
    //           {activeFilters.length > 0 ? (
    //             activeFilters.map((filter) => (
    //               <button
    //                 type="button"
    //                 id={filter.id}
    //                 onClick={handleSetFilter}
    //                 value={filter.value}
    //                 key={`${filter.id}-${filter.value}`}
    //                 className={styles.activeFilterButton}
    //               >
    //                 {filter.id}: {filter.value}
    //               </button>
    //             ))
    //           ) : (
    //             <p className={styles.empty}>No active filters</p>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   );
      
      

    // return (
    //     <div>
    //       <label htmlFor="culture">Filter by Culture: </label>
    //       <select id="culture" onChange={handleSetFilter}>
    //         <option value="">Select Culture</option>
    //         {cultureFilters.map((culture) => {
    //           console.log("Rendering culture option:", culture);
    //           return (
    //             <option key={culture} value={culture}>
    //               {culture}
    //             </option>
    //           );
    //         })}
    //       </select>
    
    //       <label htmlFor="price">Max Price: </label>
    //       <input
    //         id="price"
    //         type="number"
    //         placeholder="Enter max price"
    //         onChange={handleSetFilter}
    //       />
    
    //       <label htmlFor="endDate">Max End Date: </label>
    //       <input
    //         id="endDate"
    //         type="number"
    //         placeholder="Enter max end date"
    //         onChange={handleSetFilter}
    //       />
    
    //       <div>
    //         {activeFilters.map((filter) => (
    //           <button
    //             type="button"
    //             id={filter.id}
    //             onClick={handleSetFilter}
    //             value={filter.value}
    //             key={`${filter.id}-${filter.value}`}
    //           >
    //             {filter.value}
    //           </button>
    //         ))}
    //       </div>
    //     </div>
    //   );
}

export default SideFilter;