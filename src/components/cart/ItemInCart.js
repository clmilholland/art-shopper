import React from "react";
import styles from './ItemInCart.module.css';
import { removeFromCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ItemInCart = ({item}) => {
    const dispatch = useDispatch();
    console.log(item)

    return (
        <div className={styles.itemContainer} >
            <div className={styles.infoContainer} >
                <h3>{item.title}</h3>
                <h4>{item.artistDisplayName}</h4>
                <h5>Price: <section>${item.price}</section></h5>
            </div>
            <img src={item.primaryImageSmall} alt={item.title}/>
            <button onClick={() => dispatch(removeFromCart(item.objectID))} className={styles.removeButton} />
        </div>
    )
}


export default ItemInCart;