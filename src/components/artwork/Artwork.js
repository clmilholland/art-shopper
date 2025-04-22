import React from 'react';

const Artwork = ({ artwork }) => {
    // console.log('Artwork component is being called, artwork:', artwork);

    return (
        <div style={{ border: '1px solid blue', padding: '10px', margin: '10px' }}>
            <h1>Artwork Component</h1>
            <p>Artwork data: {artwork ? JSON.stringify(artwork) : 'Not available'}</p>
        </div>
    );
};

export default Artwork;