import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMessage, clearMessage } from "../../features/cart/cartSlice";
import styles from './Message.module.css';

const Message = () => {
    const dispatch = useDispatch();
    const message = useSelector(selectMessage)

    useEffect(() => {
        if(message) {
            const timer = setTimeout(() => {
                dispatch(clearMessage())
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [message, clearMessage, dispatch]);

    if (!message) return null;

    return (
        <div className={styles.notification}>
            {message}
        </div>
    )
}


export default Message;