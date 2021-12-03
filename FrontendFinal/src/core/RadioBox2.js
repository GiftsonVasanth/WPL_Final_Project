import React, { useState } from "react";

const RadioBox2 = ({ categories, handleFilters }) => {
    // eslint-disable-next-line
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return categories.map((p, i) => (
        <div key={i}>
        <label className="form-check-label all-text-color">
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2 ml-3"
            />
            {p.name}</label>
        </div>
    ));
};

export default RadioBox2;
