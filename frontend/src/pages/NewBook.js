import {React, useState} from 'react';
import {useNavigate } from 'react-router-dom';
import BookForm from '../Components/NewBookComponents/BookForm';
import '../Components/NewBookComponents/BookForm.css';
import '../App.css';

const NewBook = () => {
  const navigate = useNavigate();
  let token = 'Bearer ' + localStorage.getItem('token');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleTitle = event => setTitle(event.target.value);
  const handleAuthor = event => setAuthor(event.target.value);
  const handleGenre = event => setGenre(event.target.value);
  const handleImage = event => setImage(event.target.value);
  const handleDescription = event => setDescription(event.target.value);
  const clearMode = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setImage('');
    setDescription('');
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert('A new book is: ' + title);
    
    try{
      const response = await fetch('http://localhost:5000/api/books/',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          title: title,
          author: author,
          genre: genre,
          image: image,
          description: description
        })
      });
      
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message);
      }

      alert('New book added successfully!');
      clearMode();
      navigate(`/${data.book.creator}/mybooks`);
    }catch(err){
      alert(err);
    }
  }
  
  return (
    <> 
    <div className='newbook'>
      <h1>ADD NEW BOOK</h1>
      <p>to your collection</p>
      <BookForm title={title} author={author} genre={genre} image={image} description={description} handleSubmit={handleSubmit} handleTitle={handleTitle} handleAuthor={handleAuthor} handleGenre={handleGenre} handleImage={handleImage} handleDescription={handleDescription} />
    </div>
    </>
  )
};

export default NewBook;