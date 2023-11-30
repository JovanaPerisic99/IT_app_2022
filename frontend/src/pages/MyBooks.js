import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Boxes from '../Components/BrowseComponents/Boxes';
import '../App.css';

function MyBooks() {
  const token = 'Bearer ' + localStorage.getItem('token');
  const [loadedBooks, setLoadedBooks] = useState([]);
  const userId = useParams().userId;

  useEffect(()=>{
    const sendRequest = async () => {
      try{
        const response = await fetch(`http://localhost:5000/api/books/user/${userId}`,{
        method: 'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization': token }});
        const data = await response.json();

        if(!response.ok){
          throw new Error(data.message);
        }

        //console.log(data);
        setLoadedBooks(data.books);
      }catch(err){
        console.log(err);
      }
    }
    sendRequest();
  },[]);

  const bookDeletedHandler = deletedBookId => {
    setLoadedBooks(prevBooks =>
      prevBooks.filter(book => book.id !== deletedBookId)
    );
  };

  return (<> 
    <div className='mybooks'>
        {loadedBooks && <Boxes items={loadedBooks} title="MY BOOKS" btns={true} onDeleteBook={bookDeletedHandler}/>}
  </div></>)
}

export default MyBooks