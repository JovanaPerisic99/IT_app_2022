import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../Components/AuthenticationComponents/SignUp';
import LogIn from '../Components/AuthenticationComponents/LogIn';
import '../Components/AuthenticationComponents/Authentication.css';
import '../App.css';

function Authentication() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleUsername = event => setUsername(event.target.value);
  const handleEmail = event => setEmail(event.target.value);
  const handlePassword = event => setPassword(event.target.value);
  const handlePhone = event => setPhone(event.target.value);
  const handleMode = () => {
    setIsLoginMode(!isLoginMode);
    clearMode();
  }
  const clearMode = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPhone('');
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    
    try{
      const response = await fetch('http://localhost:5000/api/users/signup',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
          phone: phone
        })
      });
      
      const data = await response.json();  //createdUser or error
      if(!response.ok){
        throw new Error(data.message);
      }

      //console.log(data);
      handleMode();
      clearMode();
    }catch(err){
      alert(err);
      handleMode();
      clearMode();
    }
  }

  const handleLogIn = async (event) =>{
    event.preventDefault();
    
    try{
      const response = await fetch('http://localhost:5000/api/users/login',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      
      const data = await response.json();  //logInUser or error
      if(!response.ok){
        throw new Error(data.message);
      }

      alert("YOU ARE LOGGED IN.");
      localStorage.setItem('token', data.token);
      navigate('/',{ replace: true });
      window.location.reload();
    }catch(err){
      alert(err);
      clearMode();
    }
  }
  
  return (
    <>
    <div className='authentication'>
      <h1>{!isLoginMode ? 'Sign Up': 'Log In'}</h1>
      <p>{!isLoginMode ? 'Already have an account?': 'Not have an account?'}</p>
      <p className='alternative-link' onClick={handleMode}> {!isLoginMode ? 'Log In': 'Sign Up'}</p>
      {!isLoginMode && <SignUp username={username} email={email} password={password} phone={phone} handleSubmit={handleSignUp} handleUsername={handleUsername} handleEmail={handleEmail} handlePassword={handlePassword} handlePhone={handlePhone} />}
      {isLoginMode && <LogIn email={email} password={password} handleSubmit={handleLogIn} handleEmail={handleEmail} handlePassword={handlePassword}/>}
    </div></>
  )
}

export default Authentication