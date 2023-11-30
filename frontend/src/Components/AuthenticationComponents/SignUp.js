import React from 'react';
import './Authentication.css';

function SignUp({username,email,password,phone,handleSubmit,handleUsername,handleEmail,handlePassword, handlePhone}) {
  return (
    <form onSubmit={handleSubmit} className='form__containers'>
        <div className='form'>
          <input type="text" className='form__input' id='username' value={username} placeholder=' ' onChange={handleUsername} autoComplete='off' required/>
          <label className='form__label' htmlFor='username'>Name</label>
        </div>
        <div className='form'>
          <input type="email" className='form__input' id='email' value={email} placeholder=' ' onChange={handleEmail} autoComplete='off' required/>
          <label className='form__label' htmlFor='email'>Email</label>
        </div>
        <div className='form'>
          <input type="password" className='form__input' id='password' value={password} placeholder=' ' onChange={handlePassword} autoComplete='off' required/>
          <label className='form__label' htmlFor='password'>Password</label>
        </div>
        <div className='form'>
          <input type="tel" className='form__input' id='phone' value={phone} placeholder='06x-xxx-xxx' onChange={handlePhone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" autoComplete='off' required/>
          <label className='form__label' htmlFor='phone'></label>
        </div>
        <div className='form'>
          <input type="submit" className='form__submit' value="SUBMIT" />
        </div>
        
    </form>
  )
}

export default SignUp