import React from 'react'
import { assets } from '../../assets/frontend_assets/assets';
import './FoodItem.css'

const FoodItem = ({item}) => {
  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={item.image} alt="item-image" />
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{item.name}</p>
          <img src={assets.rating_starts} alt="item-rating" />
        </div>
        <p className='food-item-desc'>{item.description}</p>
        <p className='food-item-price'>${item.price}</p>
      </div>
    </div>
  )
}

export default FoodItem;
