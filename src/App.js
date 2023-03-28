import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Movies from './Components/Movies/MoviesPage'
import Navbar from './Components/Navbar/Navbar'
import ShowDetails from './Components/Details/ShowDetails'
import ShowsPage from './Components/Shows/ShowsPage'
import MovieDetails from './Components/Details/MovieDetails'
import ActorDetails from './Components/Details/ActorDetails'
import SignUP from './Components/Register/SignUP'
import LogIN from './Components/Register/LogIN'
import Account from './Components/Account/Account'
import ProtectedRoute from './Components/ProtectedRoute'
import NotFound from './Components/NotFound/NotFound'
import SingleCat from './Components/Movies/SingleCat'
import SingleCatTV from './Components/Shows/SingleCatTV'


function App() {
  let navigate=useNavigate();
  let [userData,setUserData]=useState(null);

  function getUserData(){
    let decode= jwtDecode(localStorage.getItem('userToken'))
    setUserData(decode);
  }

  function logout(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/home');
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      getUserData();
    }
  },[])

  return (
    <>
    <Navbar userData={userData} logout={logout}/>
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path='/account' element={<Account/>}></Route>
      </Route>
      <Route path='/tv/:id' element={<ShowDetails/>}></Route>
      <Route path='/movie/:id' element={<MovieDetails/>}></Route>
      <Route path='/person/:id' element={<ActorDetails/>}></Route>
      <Route path='/list/movie/:id' element={<SingleCat/>}></Route>
      <Route path='/list/tv/:id' element={<SingleCatTV/>}></Route>
      <Route path='/signup' element={<SignUP/>}></Route>
      <Route path='/login' element={<LogIN/>}></Route>
      <Route path='/movies' element={<Movies/>}></Route>
      <Route path='/shows' element={<ShowsPage/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App

// https://api.themoviedb.org/3/discover/movie?api_key=c479608cd31492c8dbd2552c8c9960e7&with_genres=28