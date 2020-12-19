import React, { Component } from 'react';
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom'
import './MovieGalleryDetails.css'


class MovieGalleryDetails extends Component {

   render() {

      let { id } = useParams();
      return (
         <div className="movie-gallery-item">
             <h1>Hello from MovieGalleryDetails</h1>
             <h1>ID: {id}</h1>
         </div>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(MovieGalleryDetails);