import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieGalleryItem.css'


class MovieGallery extends Component {

   render() {
      return (
         <div className="movie-gallery-item">
             <img title="Click to View Details" src={this.props.movie.poster} alt={this.props.movie.title}/>
             <p>Click to View Details</p>
         </div>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(MovieGallery);