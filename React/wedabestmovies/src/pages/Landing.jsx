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
