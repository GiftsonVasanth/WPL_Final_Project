import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import Corosal from './Corosal';
import HomeIcon from './HomeIcon';
import Gallery from './GalleryimgHome';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    /* eslint-disable no-unused-vars */
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        
        <Layout
            title=""
            description=""
            className="container-fluid m-0 p-0"
        >
        <Corosal />
        <Search />
        <HomeIcon />
        
        <h2 className="mb-3 p-3 text-center text-success font-weight-bold h2" id="homegallery">Gallery</h2>
        <Gallery />
        </Layout>
    );
};

export default Home;
