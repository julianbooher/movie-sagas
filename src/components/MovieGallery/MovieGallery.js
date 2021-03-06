import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieGallery.css'
import MovieGalleryItem from '../MovieGalleryItem/MovieGalleryItem';


class MovieGallery extends Component {

    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_MOVIES'});
    }

   render() {
      return (
         <div className="movie-gallery">
             <h1>Gallery</h1>
             {this.props.reduxState.movies.map(
                 (movie) => {
                     return(
                         <MovieGalleryItem key={movie.id} movie={movie} />
                     )
                 }
             )}
         </div>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(MovieGallery);