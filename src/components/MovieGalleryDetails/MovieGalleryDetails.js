import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import './MovieGalleryDetails.css'


class MovieGalleryDetails extends Component {

   state = this.props.location.state

   componentDidMount = () => {
      if (this.state){
         this.props.dispatch({type: 'FETCH_DETAILS', payload: this.state.movieId});
         this.props.dispatch({type: 'FETCH_DETAILS_GENRES', payload: this.state.movieId})
      }
   }

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

      return (
         <>
         {JSON.stringify(this.props.reduxState.details)}
            {/* Without this conditional, the variable is undefined because of how the page loads. */}
            {this.state && 
            <div className="movie-details-item">
               <h1>{this.props.reduxState.details.title}</h1>
               <img src={this.props.reduxState.details.poster} alt={this.props.reduxState.details.title}/>
               <p>Genres</p>
               {this.createGenreString(this.props.reduxState.details.genres)}
               <p>{this.props.reduxState.details.description}</p>
            </div>
            }
            <button onClick={this.returnToGallery}>Return to Gallery</button>
         </>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(withRouter(MovieGalleryDetails));