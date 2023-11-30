import React from 'react';
import './Authentication.css';

function LogIn({email,password,handleSubmit,handleEmail,handlePassword}) {
  return (
    <form onSubmit={handleSubmit} className='form__containers'>
        <div className='form'>
          <input type="email" className='form__input' id='email' value={email} placeholder=' ' onChange={handleEmail} autoComplete='off' required/>
          <label className='form__label' htmlFor='email'>Email</label>
        </div>
        <div className='form'>
          <input type="password" className='form__input' id='password' value={password} placeholder=' ' onChange={handlePassword} autoComplete='off' required/>
          <label className='form__label' htmlFor='password'>Password</label>
        </div>
        <div className='form'>
          <input type="submit" className='form__submit' value="SUBMIT" />
        </div>
    </form>
  )
}

export default LogIn