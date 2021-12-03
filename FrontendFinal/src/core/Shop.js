import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import RadioBox2 from "./RadioBox2";
import { prices } from "./fixedPrices";
import usePagination from "./pagination";
import { Pagination } from "@material-ui/lab";



const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    /* eslint-disable no-unused-vars */
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(100);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    let [page, setPage] = useState(1);
    const PER_PAGE = 5;

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                console.log('size :', data.size);
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const count = Math.ceil(filteredResults.length / PER_PAGE);
    const _DATA = usePagination(filteredResults, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    

    

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title=""
            description=""
            className=""
        >
        
        
        <div className="container-fluid">

            

            <div className="row mt-3">
                <div className="col-md-2 col-sm-12 border-right shadow">
                    <h5 className="h5 font-weight-bold all-text-color text-center my-3 border-bottom">Filter by price range</h5>
                    <RadioBox
                        prices={prices}
                        handleFilters={filters =>
                        handleFilters(filters, "price")
                    }
                    />

                    <h3 className='h5 font-weight-bold all-text-color text-center my-3 border-bottom'>Filter by Countries</h3>
                    <RadioBox2
                        categories={categories}
                        handleFilters={filters =>
                        handleFilters(filters, "category")
                        }
                    />
                </div>

            

                <div className="col-md-10 col-sm-12">
                    <div className = 'mb-3'>
                        <Pagination
                            count={count}
                            size="large"
                            page={page}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row mx-auto">
                        {_DATA.currentData().map((product, i) => (
                            <div key={i} className="col-md-4 col-sm-6 col-xs-12 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    <div className = 'mb-3'>
                    <Pagination
                        count={count}
                        size="large"
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChange}
                    />
                   </div>
                </div>
            </div>
        </div>

        </Layout>
    );
};

export default Shop;
