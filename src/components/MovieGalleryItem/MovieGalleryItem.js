import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieGalleryItem.css'


class MovieGallery extends Component {

   render() {
      return (
         <div className="movie-gallery-item">
             <img src={this.props.movie.poster}/>
         </div>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(MovieGallery);