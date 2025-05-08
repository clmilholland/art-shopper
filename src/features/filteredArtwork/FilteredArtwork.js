import React from "react";
import Artwork from "../../components/artwork/Artwork";

const FilteredArtwork = ({ activeFilters, artworkList }) => {
  console.log("activeFilters:", activeFilters);

  // Start with the full artwork array
  let filteredArtwork = [...artworkList];

  // Collect all culture filters for OR logic
  const cultureFilters = activeFilters
    .filter((filter) => filter.id === "culture")
    .map((filter) => filter.value);

  // Apply culture filters first (if any)
  if (cultureFilters.length > 0) {
    filteredArtwork = filteredArtwork.filter((artwork) => {
      const hasCulture = artwork.culture || "";
      return cultureFilters.includes('unknown')
        ? !hasCulture || cultureFilters.includes(hasCulture)
        : cultureFilters.includes(hasCulture);
    });
  }

  // Apply other filters (price, endDate) sequentially
  activeFilters.forEach(({ id: filterType, value: filterValue }) => {
    if (filterType === "price" && typeof filterValue === "number") {
      filteredArtwork = filteredArtwork.filter(
        (artwork) => artwork.price < filterValue
      );
    } else if (filterType === "endDate" && typeof filterValue === "number") {
      filteredArtwork = filteredArtwork.filter(
        (artwork) => artwork.objectEndDate < filterValue
      );
    }
  });

  console.log("filteredArtwork:", filteredArtwork);

  if(filteredArtwork.length === 0) {
    return <p>No Items Found</p>
  } 
  // Map the filtered artwork to Artwork components
  return filteredArtwork.map((artwork) => (
    <Artwork key={artwork.id} artwork={artwork} />
  ));
};

export default FilteredArtwork;



// console.log(activeFilters)
// console.log(artworkList)

// // Start with the full artwork array
// let filteredArtwork = [...artworkList];

// // Apply each filter in activeFilters sequentially
// activeFilters.forEach(({ id: filterType, value: filterValue }) => {
// if (filterType === "price" && typeof filterValue === "number") {
//   filteredArtwork = filteredArtwork.filter(
//     (artwork) => artwork.price < filterValue
//   );
// } else if (filterType === "culture" && filterValue) {
//   filteredArtwork = filteredArtwork.filter(
//     (artwork) => artwork.culture === filterValue
//   );
// } else if (filterType === "endDate" && typeof filterValue === "number") {
//   filteredArtwork = filteredArtwork.filter(
//     (artwork) => artwork.objectEndDate < filterValue
//   );
// }
// });

// // Map the filtered artwork to Artwork components
// return filteredArtwork.map((artwork) => (
// <Artwork key={artwork.id} artwork={artwork} />
// ));