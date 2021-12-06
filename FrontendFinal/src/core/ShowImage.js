import React, { useState } from 'react';
import { API } from "../config";
import './../../node_modules/react-modal-video/scss/modal-video.scss';
const ShowImage = ({ item, url }) =>{ 
    const [isOpen, setOpen] = useState(false);
    return(
    <div className="product-img">
    <div className="d-flex justify-content-center">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3 img-thumbnail w-100 m-1"
            style={{ maxHeight: 'auto', maxWidth: "500px"}}
            onClick={()=> setOpen(true)}
        />
    </div>
    </div>
)
};

export default ShowImage;
