import React, { useEffect, useState } from 'react';
import './App.css';
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=41f03ac897ab5e9aaa62387339883962&sort_by=popularity.desc&page=1"

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=41f03ac897ab5e9aaa62387339883962&query="


function App() {
  
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect( () => {
    getMovies(FEATURED_API)
    
  }, [])

  const getMovies = (API) => {
    
    fetch(API)
    .then((res) => res.json())
    .then((data) =>{
      console.log(data)
      setMovies(data.results)
    })

  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if(setSearchTerm)
    getMovies(SEARCH_API + searchTerm)
    

      setSearchTerm("")

  }

  const handleOnchange = (e) => {
    setSearchTerm(e.target.value)
  }


  return (
    <>
    
    <header onSubmit={handleOnSubmit}>
    <form>
        <input 
        className="search" 
        type="search" 
        placeholder="Buscar..." 
        value={searchTerm} 
        onChange={handleOnchange}>
        </input>
        </form>
      </header>
    
    
    <div className="movie-container">
      
     {
      movies.length > 0 && movies.map((movie) => (
        <Movie key={movie.id} {...movie} />
       ))
     }
    </div>
    </>
  );
}

export default App;
