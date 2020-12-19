import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import './MovieGalleryItem.css'


class MovieGalleryItem extends Component {

    // TODO onClick function to bring the user to the details page
    // set reduxState of selected movie to this item's details
    // use this.props.history.push('/details')

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

export default connect(mapStateToProps)(MovieGalleryItem);