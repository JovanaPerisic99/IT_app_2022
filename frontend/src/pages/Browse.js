import React, {useEffect, useState} from 'react';
import Boxes from '../Components/BrowseComponents/Boxes';
import '../App.css';


function Browse() {
  const [loadedBooks, setLoadedBooks] = useState([]);
  const genreSpec = localStorage.getItem('genre');

  useEffect(()=>{
    const sendRequest = async () => {
      try{
        const response = await fetch('http://localhost:5000/api/books/browse');
        const data = await response.json();

        if(!response.ok){
          throw new Error(data.message);
        }

        //console.log(data);

        if(genreSpec){
          const filteredBooks = data.books.filter(book => book.genre === genreSpec) 
          setLoadedBooks(filteredBooks);
        }else{
          setLoadedBooks(data.books);
        }
        localStorage.removeItem('genre');
      }catch(err){
        console.log(err);
      }
    }
    sendRequest();
  },[]);

  return (
    <> 
    <div className='browse'>
      {loadedBooks && <Boxes items={loadedBooks} title="Here are some recommended books from our users:" btns={false}/>}
  </div></>)
}

export default Browse