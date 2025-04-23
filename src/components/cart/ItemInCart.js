import React from "react";
import styles from './ItemInCart.module.css';

const ItemInCart = ({item}) => {
    return (
        <div className={styles.itemContainer} >
            <div className={styles.infoContainer} >
                <h3>{item.title}</h3>
                <h4>{item.artistDisplayName}</h4>
                <h5>Price: <section>${item.price}</section></h5>
            </div>
            <img src={item.primaryImage} alt={item.title}/>
        </div>
    )
}


export default ItemInCart;