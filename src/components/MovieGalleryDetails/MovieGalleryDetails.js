import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieGalleryDetails.css'


class MovieGalleryDetails extends Component {

   render() {
      const currentMovie = this.props.reduxState.details[0]
      console.log('currentMovie const', currentMovie)

      return (
         <>
             {currentMovie !== undefined &&
            <div className="movie-details-item">
               <h1>{currentMovie.title}</h1>
               <img src={currentMovie.poster} alt={currentMovie.title}/>
               <p>{currentMovie.description}</p>
            </div>
             }
         </>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(MovieGalleryDetails);