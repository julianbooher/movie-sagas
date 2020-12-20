import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieGalleryDetails.css'


class MovieGalleryDetails extends Component {

   returnToGallery = () => {
      console.log('inside returnToGallery')
      this.props.history.push('/')
   }

   createGenreString = (genreArray) => {
      let returnString = '| '
      if (genreArray !== undefined){
         if (genreArray.length === 0){
            return 'None Listed'
         }
         for (let genre of genreArray){
            returnString += ` ${genre.name} |`
         }
         return returnString;
      }
   }

   render() {
      // This holds the movie details (title, image, description).
      const currentMovie = this.props.reduxState.details[0]
      // This holds the genres in an array.
      const currentMovieGenres = this.props.reduxState.details[1]
      // Variable to put in the return that displays the genres.
      let genreString = this.createGenreString(currentMovieGenres);
      console.log('currentMovie const', currentMovie)
      console.log('currentMovie const', currentMovieGenres)

      return (
         <>
            {/* Without this conditional, the variable is undefined because of how the page loads. */}
            {currentMovie !== undefined && currentMovieGenres !== undefined &&
            <div className="movie-details-item">
               <h1>{currentMovie.title}</h1>
               <img src={currentMovie.poster} alt={currentMovie.title}/>
               <p>Genres</p>
               <p>{genreString} </p>
               {/* {currentMovieGenres.map} */}
               <p>{currentMovie.description}</p>
            </div>}
            <button onClick={this.returnToGallery}>Return to Gallery</button>
         </>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(MovieGalleryDetails);