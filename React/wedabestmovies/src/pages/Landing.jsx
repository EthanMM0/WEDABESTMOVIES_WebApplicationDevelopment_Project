import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App'; // Import AuthContext
import SmileImg from '../images/Smile.png';
import BatmanImg from '../images/Batman.png';
import DuneImg from '../images/Dune.png';
import SpiderManImg from '../images/Spider-man-no-way-home.png';
import '../components/Landing.css';

function Landing() {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [movieList, setMovieList] = useState([]);
  const [isMovieListCreated, setIsMovieListCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMovieList = JSON.parse(localStorage.getItem('movieList'));
    if (savedMovieList) {
      setMovieList(savedMovieList);
      setIsMovieListCreated(true);
    }
  }, []);

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

  const handleAddToMovieList = (movie) => {
    if (!isMovieListCreated) {
      alert('Please create a movie list first!');
      return;
    }

    if (!movieList.find((item) => item.name === movie.name)) {
      setMovieList((prevMovieList) => [...prevMovieList, movie]);
    }
  };

  const handleAddToCartFromMovieList = async (movie) => {
    if (!user) {
      alert('Please log in first!');
      navigate('/signin'); // Redirect to sign-in if user is not logged in
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username, // Using the user's username from AuthContext
          movieName: movie.name,
          quantity: 1, // Default quantity
          movieImage: movie.img,
        }),
      });

      if (response.ok) {
        alert('Movie added to cart!');
        navigate('/checkout'); // Redirect to the checkout page after adding movie to cart
      } else {
        alert('Failed to add movie to cart');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding movie to cart');
    }
  };

  const handleAddAllToCart = async () => {
    if (!user) {
      alert('Please log in first!');
      navigate('/signin'); // Redirect to sign-in if user is not logged in
      return;
    }

    try {
      // Loop through the movie list and add movies one by one in the same order
      for (let i = 0; i < movieList.length; i++) {
        const movie = movieList[i];

        const response = await fetch('http://localhost:5000/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user.username, // Using the user's username from AuthContext
            movieName: movie.name,
            quantity: 1, // Default quantity
            movieImage: movie.img,
          }),
        });

        // If any movie fails to add to the cart, stop the process and alert the user
        if (!response.ok) {
          alert(`Failed to add ${movie.name} to cart`);
          return;
        }
      }

      // If all movies are successfully added to the cart
      alert('All movies added to cart!');
      navigate('/checkout'); // Redirect to the checkout page after adding all movies

    } catch (error) {
      console.error(error);
      alert('Error adding movies to cart');
    }
  };

  const handleRemoveFromMovieList = (movie) => {
    setMovieList((prevMovieList) =>
      prevMovieList.filter((item) => item.name !== movie.name)
    );
  };

  return (
    <div className="page-container">
      <button className="create-button" onClick={handleCreateMovieList}>
        Create Movie List
      </button>
      <button className="delete-button" onClick={handleDeleteMovieList}>
        Delete Movie List
      </button>

      {isMovieListCreated && (
        <div className="movie-list-bar active">
          <div className="movie-list-header">My Movie List</div>
          {movieList.map((movie, index) => (
            <div key={index} className="movie-list-item">
              <img src={movie.img} alt={movie.name} />
              <span>{movie.name}</span>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCartFromMovieList(movie)}
              >
                Add to Cart
              </button>
              <button
                className="delete-button-from-movie"
                onClick={() => handleRemoveFromMovieList(movie)}
              >
                Delete
              </button>
            </div>
          ))}

          {/* Add All to Cart Button */}
          {movieList.length > 0 && (
            <button
              className="add-all-to-cart-button"
              onClick={handleAddAllToCart}
            >
              Add All to Cart
            </button>
          )}
        </div>
      )}

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
                  onClick={() =>
                    handleAddToMovieList({ name: 'Smile', img: SmileImg })
                  }
                >
                  Add to Movie List
                </button>
              </td>
              <td>
                <img src={BatmanImg} alt="Batman" className="movie-image" />
                <div>
                  <h3>The Batman</h3>
                  <p>Batman uncovers corruption in Gotham while facing the Riddler, a serial killer targeting the elite.</p>
                </div>
                <button
                  className="add-to-movie-list-button"
                  onClick={() =>
                    handleAddToMovieList({ name: 'The Batman', img: BatmanImg })
                  }
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
                  <p>In a distant future, a young nobleman must journey to a desert planet to protect his family and fulfill his destiny.</p>
                </div>
                <button
                  className="add-to-movie-list-button"
                  onClick={() =>
                    handleAddToMovieList({ name: 'Dune', img: DuneImg })
                  }
                >
                  Add to Movie List
                </button>
              </td>
              <td>
                <img src={SpiderManImg} alt="Spider-Man" className="movie-image" />
                <div>
                  <h3>Spider-Man: No Way Home</h3>
                  <p>Spider-Man faces multiple villains from other universes, seeking to erase all knowledge of his secret identity.</p>
                </div>
                <button
                  className="add-to-movie-list-button"
                  onClick={() =>
                    handleAddToMovieList({ name: 'Spider-Man: No Way Home', img: SpiderManImg })
                  }
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
