import React from 'react';
import {Button} from '../Button';
import ImgCon from './ImgCon';
import {FaUserAlt, FaStar, FaPen, FaWindowClose, FaBook} from 'react-icons/fa';

function BoxItem(props) {
  const token = 'Bearer '+localStorage.getItem('token');

  const deleteHandler = async () => {
    let confirmation = window.confirm("Are you sure you want to delete this book?");
    if(confirmation){
      try {
        const response = await fetch(`http://localhost:5000/api/books/${props.id}`,{
          method: 'DELETE',
          headers:{
            'Authorization': token }});
        const data = await response.json();
  
        if(!response.ok){
          throw new Error(data.message);
        }
        props.onDelete(props.id);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <li className="box-item">
      <div className='box-item__wrapper'>
        <div className="box-item__image">
          <ImgCon className='box-item__avatar' image={props.book_image} alt={props.book_name} />
        </div>
        <div className="box-item__info">
          <h2>{props.book_title}</h2>
          <h4> <FaUserAlt className='user-icon' /> {props.book_author}  <FaBook className='genre-icon'/>{props.book_genre}</h4>
          <p>{props.book_desc}</p>
          {!props.btns && (<h4>{props.book_creatorName}: {props.book_creatorPhone}</h4>)}
        </div>
        <div className='box-item__buttons'>
          {!props.btns && <Button pathTo={`/${props.uId}/mybooks`} buttonStyle='btn--inverse' buttonSize='btn--small'> <FaStar className='shopping-cart-icon'/></Button>}
          {props.btns && <Button pathTo={`/book/${props.id}`} buttonStyle='btn--inverse' buttonSize='btn--small' ><FaPen className='edit-icon'/></Button>}
          {props.btns && <Button buttonStyle='btn--inverse' buttonSize='btn--small' onClick={deleteHandler} ><FaWindowClose className='delete-icon'/></Button>}
        </div>
      </div>
    </li>
  );
}

export default BoxItem