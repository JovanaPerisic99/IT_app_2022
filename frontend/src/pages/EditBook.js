import {React, useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../Components/NewBookComponents/BookForm';
import '../Components/NewBookComponents/BookForm.css';
import '../App.css';

const EditBook = () => {
  const navigate = useNavigate();
  const bookId = useParams().bookId;
  const token = 'Bearer ' + localStorage.getItem('token')

  useEffect(()=>{
    const sendRequest = async () => {
      try{
        const response = await fetch(`http://localhost:5000/api/books/${bookId}`,{
        method: 'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization': token }});
        const data = await response.json();

        if(!response.ok){
          throw new Error(data.message);
        }
        
        setTitle(data.book.title);
        setAuthor(data.book.author);
        setGenre(data.book.genre);
        setImage(data.book.image);
        setDescription(data.book.description);
      }catch(err){
        alert(err);
      }
    }
    sendRequest();
  },[]);

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
  
  const handleSubmit = async (event) => {
    alert('An edited book is: ' + title+genre+description);
    event.preventDefault();

    try{
      const response = await fetch(`http://localhost:5000/api/books/${bookId}`,{
        method: 'PATCH',
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

      //console.log(data);
      alert('Book edited successfully!');
      navigate(`/${data.book.creator}/mybooks`);
    }catch(err){
      alert(err);
    }
  }
  
  return (
    <>
    <div className='newbook'>
      <h1>EDIT BOOK</h1>
      <BookForm title={title} author={author} genre={genre} image={image} description={description} handleSubmit={handleSubmit} handleTitle={handleTitle} handleAuthor={handleAuthor} handleGenre={handleGenre} handleImage={handleImage} handleDescription={handleDescription}/>
    </div></>
  )
};

export default EditBook;