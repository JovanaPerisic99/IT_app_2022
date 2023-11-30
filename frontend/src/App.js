import {React, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import MyBooks from './pages/MyBooks';
import NewBook from './pages/NewBook';
import EditBook from './pages/EditBook';
import NavBar from './Components/NavBar';
import Authentication from './pages/Authentication';
import './App.css';

function App() {
  const token = localStorage.getItem('token');
  const [userId,setUserId] = useState('');

  const handleUserId = () =>  setUserId('');
  if(token){
    const sendRequest = async () => {
      try{
        const response = await fetch('http://localhost:5000/api/users/getUserId',{
        method: 'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer '+ token }});
        const data = await response.json();

        if(!response.ok){
          throw new Error(data.message);
        }
        
        setUserId(data.user.id);
      }catch(err){
        alert(err);
      }
    }
    sendRequest();
  }
  

  return (
    <Router>
      <NavBar userId={userId} handleUserId={handleUserId}/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/browse' element={<Browse />} />
        <Route exact path='/:userId/mybooks' element={<MyBooks />} />
        <Route exact path='/:userId/favorites' element={<MyBooks />} />
        <Route exact path='/book/new' element={<NewBook />} />
        <Route exact path='/book/:bookId' element={<EditBook />} />
        <Route exact path='/authentication' element={<Authentication />} />
        <Route path='*' element={<Navigate to='/authentication' replace />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
