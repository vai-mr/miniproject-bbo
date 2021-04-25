import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';


function Product({id,title,image,price,rating}) {

    const [{basket}, dispatch] = useStateValue();
    console.log("this is the basket >>> ", basket);
    const addToBasket = () => {
        //dispatch the item into data layer
        //dispatch allows u to shoot into the dl
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    }

    return (
        <div class='product'>
            <div className="product_info">
                <p className='product_title'>{title}</p>
                <p className="product_price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {Array(rating).fill().map((_,i) =>(<p>⭐</p>))}
                     
                </div>
            </div>
            <img src={image} alt="" />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
