import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import BoxerAtRest from '../../images/BoxerAtRest.jpg';
import Angel from '../../images/Angel.webp';
import LastSupper from '../../images/LastSupper.webp';
import StarryNight from '../../images/StarryNight.jpg';
import TheRaft from '../../images/TheRaft.jpeg';
import TheScream from '../../images/TheScream.webp';
import ArtriaLogoCropped from '../../images/ArtriaLogoCropped.webp';

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.artworkColumnLeft}>
                <div className={styles.artworkCard}>
                    <img src={BoxerAtRest} alt="Boxer At Rest" className={styles.artworkImage} loading="lazy" />
                </div>
                <div className={styles.artworkCard}>
                    <img src={Angel} alt="Angel Statue" className={styles.artworkImage} loading="lazy" />
                </div>
                <div className={styles.artworkCard}>
                    <img src={TheRaft} alt="The Raft" className={styles.artworkImage} loading="lazy" />
                </div>
            </div>
            <div className={styles.content}>
                <img src={ArtriaLogoCropped} alt="Artria Logo" className={styles.logoImage} loading="lazy" />
                <h1 className={styles.title}>ARTRIA</h1>
                <p className={styles.story}>
                    Art should be accessible, inspiring, and part of everyday life. That’s why we built Artria — a platform where anyone can explore and own the world’s most iconic masterpieces.
                    Powered by the Metropolitan Museum of Art’s open-access API, our curated collection spans centuries, offering a seamless way to discover and appreciate art from every era.
                    Whether you’re a seasoned collector or a curious newcomer, we’re here to help you bring the beauty of timeless art into your space, one masterpiece at a time.
                </p>
                <Link to="/artwork" className={styles.shopButton}>Shop Artwork</Link>
            </div>
            <div className={styles.artworkColumnRight}>
                <div className={styles.artworkCard}>
                    <img src={StarryNight} alt="Starry Night" className={styles.artworkImage} loading="lazy" />
                </div>
                <div className={styles.artworkCard}>
                    <img src={LastSupper} alt="The Last Supper" className={styles.artworkImage} loading="lazy" />
                </div>
                <div className={styles.artworkCard}>
                    <img src={TheScream} alt="The Scream" className={styles.artworkImage} loading="lazy" />
                </div>
            </div>
        </div>
    );
};

export default Home;