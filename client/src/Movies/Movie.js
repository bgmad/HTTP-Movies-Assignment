import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import EditMovieForm from "./EditMovieForm";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const [edit, setEdit] = useState(false);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };
  const editMovie = () => {
    setEdit(!edit);
  };
  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => window.location.href = '/')
      .catch(err => console.error(err.response));
    
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  
  return (
    <div className="save-wrapper">
      {!edit ? (
        <>
          <MovieCard movie={movie} />
          <div className="save-button" onClick={saveMovie}>
            Save
          </div>
          <div className="edit-button" onClick={editMovie}>
            Edit
          </div>
        </>
      ) : (
        <>
          <EditMovieForm movie={movie} setMovie={setMovie} setEdit={setEdit}/>
        </>
      )}
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
