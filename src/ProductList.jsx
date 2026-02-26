import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(true);

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                 }

            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                },
                 {
                    name: "Mint",
                    image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                    description: "Refreshing aroma, used in teas and cooking.",
                    cost: "$12"
                    }
            ]
         }
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '300px',
    };

    const styleA = {
        color: 'white',
        fontSize: '20px',
        textDecoration: 'none',
        cursor: 'pointer'
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
        setShowPlants(false);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowPlants(true);
    };

    const isInCart = (plantName) => {
        return cartItems.some(item => item.name === plantName);
    };

    const handleAddToCart = (plant, category) => {
        dispatch(addItem({
            id: plant.name + category,  // unique ID
            name: plant.name,
            image: plant.image,
            cost: parseInt(plant.cost.replace('$', ''))
        }));
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div>
                    <a href="/" onClick={handleHomeClick} style={styleA}>
                        <h3>Paradise Nursery</h3>
                    </a>
                </div>
                <div style={styleObjUl}>
                    <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
                    <a href="#" onClick={handleCartClick} style={styleA}>Cart</a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {showPlants && plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2>{category.category}</h2>
                            <div className="plants-container">
                                {category.plants.map((plant, idx) => (
                                    <div className="plant-card" key={idx}>
                                        <img src={plant.image} alt={plant.name} className="plant-image" />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p>{plant.cost}</p>

                                        <button
                                            disabled={isInCart(plant.name)}
                                            onClick={() => handleAddToCart(plant, category.category)}
                                        >
                                            {isInCart(plant.name) ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

 export default ProductList;