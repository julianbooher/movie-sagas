import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import './MovieGalleryItem.css'


class MovieGalleryItem extends Component {

    goToDetails = () => {
        console.log('in goToDetails', this.props.movie.id);
        this.props.history.push({pathname: `/details`, state: {movieId: this.props.movie.id}})
    }

   render() {
      return (
            <div onClick={this.goToDetails} className="movie-gallery-item">
                <img title="Click to View Details" src={this.props.movie.poster} alt={this.props.movie.title}/>
                {<p>View Details</p>}
            </div>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(withRouter(MovieGalleryItem));