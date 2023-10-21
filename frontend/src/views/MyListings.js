import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import styles from '../styles/App.module.css';

export default function MyListings() {
    return (
        <div className={styles.view}>
            <h1>My Listings</h1>
        </div>
    )


}