import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import './MovieGalleryItem.css'


class MovieGalleryItem extends Component {

    // TODO onClick function to bring the user to the details page
    // need get route for individual movie
    // set reduxState of selected movie to this item's details
    // use this.props.history.push('/details')

    goToDetails = () => {
        console.log('in goToDetails', this.props.movie.id);
        this.props.dispatch({type: 'FETCH_DETAILS', payload: this.props.movie.id});
        this.props.dispatch({type: 'FETCH_DETAILS_GENRES', payload: this.props.movie.id})
        this.props.history.push(`/details`)
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