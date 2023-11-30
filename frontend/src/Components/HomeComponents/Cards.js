import React from 'react';
import CardItem from './CardItem';
import './Cards.css';


function Cards() {
  return (
    <div className='cards'>
      <h1>Check out books from our <u><b>TOP</b></u> genres!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-7.jpg'
              text='Explore the hidden worlds and go on epic adventures'
              label='Adventure'
              path='/browse'
              genre='Adventure'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Discover all the best books of classical literature'
              label='Classics'
              path='/browse'
              genre='Classic'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-10.jpg'
              text='Have everything from bestselling fiction to classics on one device'
              label='EBooks'
              path='/browse'
              genre='EBooks'
            />
            <CardItem
              src='images/img-16.jpg'
              text='Experience the worlds beyond our with these books'
              label='Fantasy'
              path='/browse'
              genre='Fantasy'
            />
            <CardItem
              src='images/img-6.jpg'
              text='Lose yourself in beauty of poetry and lyrics'
              label='Poetry'
              path='/browse'
              genre='Poetry'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;