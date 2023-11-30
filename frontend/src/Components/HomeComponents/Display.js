import React from 'react';
import { Button } from '../Button';
import './Display.css';

function Display() {
  const token = localStorage.getItem('token');
  
  return (
    <div className='display-container'>
      <h1>WELCOME TO BEx</h1>
      <p>Exchange books with strangers &<br/>discover your new favorite books</p>
      <div className='display-btns'>
        {!token &&(<Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          pathTo='/authentication'
        >
          GET STARTED
        </Button>)}
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          pathTo='/browse'
        >
          BROWSE
        </Button>
      </div>
    </div>
  )
}

export default Display