import React from 'react';
import BoxItem from './BoxItem';
import { Button } from '../Button';
import './Boxes.css';

function Boxes(props) {
    if(props.items.length === 0){
      if(props.btns){
        return(
          <div className='center'>
            <h2 className='not_found'>No books found</h2>
            <Button pathTo="/book/new" className='btns'
              buttonStyle='btn--primary'
              buttonSize='btn--large'>Add a book</Button>
        </div>)
      }else{
        return(
          <div className='center'>
            <h2 className='not_found'>No books found</h2>
          </div>
        );
      }
    }

    return (
      <div className='box-list_container'>
        <p className='browser-page__title'>{props.title}</p>
        <ul className="box-list">
          {props.btns && (<Button pathTo="/book/new" 
              buttonStyle='btn--primary'
              buttonSize='btn--large'>Add new book</Button>)}
          {props.items.map(book => (
            <BoxItem
              key={book.id}
              id={book.id}
              uId={book.creator}
              book_title={book.title}
              book_author={book.author}
              book_genre={book.genre}
              book_image={book.image}
              book_desc={book.description}
              book_creatorName={book.creator.name}
              book_creatorPhone={book.creator.phone}
              btns={props.btns}
              onDelete={props.onDeleteBook}
            />
          ))}
        </ul>
      </div>
      );
}

export default Boxes