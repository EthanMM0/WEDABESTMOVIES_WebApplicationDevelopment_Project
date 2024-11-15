<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Logo from '../images/WDBM.png';
import SmileImg from '../images/Smile.png';
import BatmanImg from '../images/Batman.png';
import DuneImg from '../images/Dune.png';
import SpiderManImg from '../images/Spider-man-no-way-home.png';
import '../components/Landing.css';

function Landing() {
  const [movieList, setMovieList] = useState([]);
  const [isMovieListCreated, setIsMovieListCreated] = useState(false);

  // Retrieve the movie list from localStorage
  useEffect(() => {
    const savedMovieList = JSON.parse(localStorage.getItem('movieList'));
    if (savedMovieList) {
      setMovieList(savedMovieList);
      setIsMovieListCreated(true);
    }
  }, []);

  // Saves the movie list to localStorage whenever it changes
  useEffect(() => {
    if (isMovieListCreated) {
      localStorage.setItem('movieList', JSON.stringify(movieList));
    }
  }, [movieList, isMovieListCreated]);

  const handleCreateMovieList = () => {
    setIsMovieListCreated(true);
  };

  const handleDeleteMovieList = () => {
    setMovieList([]);
    setIsMovieListCreated(false);
    localStorage.removeItem('movieList');
  };

  // Alert if the user doesn't have a movie list
  const handleAddToMovieList = (movie) => {
    if (!isMovieListCreated) {
      alert('Please create a movie list first!');
      return;
    }

    // Check for duplicates before adding to the list
    if (!movieList.find((item) => item.name === movie.name)) {
      setMovieList((prevMovieList) => [...prevMovieList, movie]);
    }
  };

  const handleRemoveFromMovieList = (movieToRemove) => {
    setMovieList((prevMovieList) =>
      prevMovieList.filter((movie) => movie !== movieToRemove)
    );
  };

  const handleAddToCartFromMovieList = (movie) => {
    alert(`Added ${movie.name} to cart!`);
  };

  return (
    <div className="page-container">
      <div className="logo-title-container">
        <img src={Logo} alt="Logo" />
        <h1>WE DA BEST MOVIES</h1>
      </div>

      <button className="create-button" onClick={handleCreateMovieList}>
        Create Movie List
      </button>
      <button className="delete-button" onClick={handleDeleteMovieList}>
        Delete Movie List
      </button>

      {/* Movie List Bar */}
      {isMovieListCreated && (
        <div className="movie-list-bar active">
          <div className="movie-list-header">My Movie List</div>
          {movieList.map((movie, index) => (
            <div key={index} className="movie-list-item">
              <img src={movie.img} alt={movie.name} />
              <span>{movie.name}</span>
              <button className="add-to-cart-button" onClick={() => handleAddToCartFromMovieList(movie)}>Add to Cart</button>
              <button className="delete-button-from-movie" onClick={() => handleRemoveFromMovieList(movie)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* The Movie Table */}
      <div className="movie-table">
        <table>
          <tbody>
            <tr>
              <td>
                <img src={SmileImg} alt="Smile" className="movie-image" />
                <div>
                  <h3>Smile</h3>
                  <p>A chilling horror movie about a woman experiencing terrifying occurrences after witnessing a traumatic event.</p>
                </div>
                <button
                  className="add-to-movie-list-button"
                  onClick={() => handleAddToMovieList({ name: 'Smile', img: SmileImg })}
                >
                  Add to Movie List
                </button>
              </td>
              <td>
                <img src={BatmanImg} alt="Batman" className="movie-image" />
                <div>
                  <h3>Batman</h3>
                  <p>A dark and gritty reboot of the Batman saga, focusing on the hero’s journey through Gotham City.</p>
                </div>
                <button
                  className="add-to-movie-list-button"
                  onClick={() => handleAddToMovieList({ name: 'Batman', img: BatmanImg })}
                >
                  Add to Movie List
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <img src={DuneImg} alt="Dune" className="movie-image" />
                <div>
                  <h3>Dune</h3>
                  <p>In the distant future, a young nobleman must protect the most valuable resource in the galaxy while battling hostile forces.</p>
                </div>
                <button
                  className="add-to-movie-list-button"
                  onClick={() => handleAddToMovieList({ name: 'Dune', img: DuneImg })}
                >
                  Add to Movie List
                </button>
              </td>
              <td>
                <img src={SpiderManImg} alt="Spider-Man: No Way Home" className="movie-image" />
                <div>
                  <h3>Spider-Man: No Way Home</h3>
                  <p>Spider-Man faces the consequences of his actions as he teams up with strange new allies and confronts old enemies.</p>
                </div>
                <button
                  className="add-to-movie-list-button"
                  onClick={() => handleAddToMovieList({ name: 'Spider-Man: No Way Home', img: SpiderManImg })}
                >
                  Add to Movie List
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Landing;
=======
import React, { useState } from 'react';
import '../components/Landing.css'; 
import logo from '../images/WDBM.png'; 

const Landing = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010 },
    { id: 2, title: "The Lion King", genre: "Animation", year: 1994 },
  ]);

  const handleAddMovie = () => {
    const newMovie = {
      id: movies.length + 1,
      title: `New Movie ${movies.length + 1}`,
      genre: "Genre",
      year: new Date().getFullYear(),
    };
    setMovies([...movies, newMovie]);
    alert('New movie added!');
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <img src={logo} alt="Site Logo" className="landing-logo" />
        <h1>We Da Best Movies</h1>
      </header>

      <main className="landing-content">
        <button className="hero-button" onClick={handleAddMovie}>
          Add New Movie
        </button>

        <div className="movies-list">
          <h2>Movie List</h2>
          <table className="movies-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Landing;
>>>>>>> 5ba026714407cf1ff662944b671eb785cf9d1665
