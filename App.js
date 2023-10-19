import './App.scss';
import React from 'react';
import Banner from './components/Banner';
import Header from './components/Header';
import List from './components/List';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomeBanner from './components/HomeBanner';
import Login from './components/Login';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={
          <>
          <Header/>
          <HomeBanner/>
          </>
        }/>
         <Route path='/login' element={
          <>
          <Login/>
          </>
        }/>
        <Route path='/register' element={
          <>
          <Login/>
          </>
        }/>
         <Route path="/dashboard" element={
            <React.Fragment>
              <Header/>
              <Banner/>
              <List title="Netflix Originals" param="originals"/>
              <List title="Trending Now" param="trending"/>
              <List title="Now Playing" param="now_playing"/>
              <List title="Popular" param="popular"/>
              <List title="Top Rated" param="top_rated"/>
              <List title="Upcoming" param="upcoming"/>
            </React.Fragment>
          }/>
      </Routes>
    </Router>
    </>

    // <div >

    //  {/* <Header/>
    //  <HomeBanner/> */}
    //  {/* <Login/> */}
    //  <Header/>
    //  <Banner/>
    //  <List/>
    // </div>
  )
}

export default App;
