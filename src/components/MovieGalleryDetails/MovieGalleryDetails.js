import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieGalleryDetails.css'


class MovieGalleryDetails extends Component {

   render() {
      return (
         <div className="movie-gallery-item">
             <h1>Hello from MovieGalleryDetails</h1>
         </div>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(MovieGalleryDetails);