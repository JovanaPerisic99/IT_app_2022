import React from 'react';
import './BookForm.css';

function BookForm({title,author,genre,image,description,handleSubmit,handleTitle,handleAuthor,handleGenre,handleImage, handleDescription}) {
    return (
      <form onSubmit={handleSubmit} className='form__containers'>
          <div className='form'>
            <input type="text" className='form__input' id='title' name='title' value={title} placeholder=' ' onChange={handleTitle} autoComplete='off' required/>
            <label className='form__label' htmlFor='title'>Title</label>
          </div>
          <div className='form'>
            <input type="text" className='form__input' id='author' name='author' value={author} placeholder=' ' onChange={handleAuthor} autoComplete='off' required/>
            <label className='form__label' htmlFor='author'>Author</label>
          </div>
          <div className='form'>
            <input type="text" className='form__input' id='image' name='image' value={image} placeholder=' ' onChange={handleImage} autoComplete='off' required/>
            <label className='form__label' htmlFor='image'>ImageURL</label>
          </div>
          <div className='form'>
            <select value={genre} name='genre' id='genre' className='form__select' onChange={handleGenre} required>
                <option value="">Genre</option>
                <option value="Adventure">Adventure</option>
                <option value="Classic">Classic</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Fiction">Fiction</option>
                <option value="Graphic Novel">Graphic Novel</option>
                <option value="Horror">Horror</option>
                <option value="Mystery">Mystery</option>
                <option value="Novel">Novel</option>
                <option value="Poetry">Poetry</option>
                <option value="Romance">Romance</option>
                <option value="Science fiction">Science fiction</option>
                <option value="Tragedy">Tragedy</option>
            </select>
          </div>
          <div className='form'>
            <label className='textarea-label' htmlFor="description">Write a short description about the book...</label>
            <textarea className='form__textarea' id="description" name="description" rows="4" cols="51" value={description} onChange={handleDescription}/>
          </div>
          <div className='form'>
            <input type="submit" className='form__submit' value="SUBMIT" />
          </div>
      </form>
    )
  }

export default BookForm