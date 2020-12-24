import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import './EditDetails.css'


class EditDetails extends Component {

   // 
   state = {
      id: '',
      title: '',
      poster: '',
      description: '',
      genre_id: ''
   }


   // Setting state to this particular movie's details from redux.
   componentDidMount = () => {

      this.props.dispatch({type: 'FETCH_GENRES'});
      // Set the state to the stored details in reduxState
      this.setState({
         ...this.props.reduxState.details,
         genre_id: this.props.reduxState.details.genres[0]["id"]
      });
   }

   handleChangeFor = (event, inputName) => {
      this.setState({
      [inputName]: event.target.value
      })
   }

   handleSubmit = (event) => {
      event.preventDefault();
      console.log('inside handleSubmit')
      this.props.dispatch({type: 'UPDATE_MOVIE', payload: this.state})
   }

   // Button to take the user back to the details page.
   returnToDetails = () => {
      console.log('inside returnToDetails')
      this.props.history.push({pathname: `/details`, state: {movieId: this.state.id}})
   }

   // Button to take the user back to the gallery.
   returnToGallery = () => {
      console.log('inside returnToGallery')
      this.props.history.push('/')
   }

   render() {

      return (
         <>
            <h1>state</h1>
            <h1>Updated Details Preview</h1>
            <h1>{this.state.title}</h1>
            <img src={this.state.poster} alt={this.state.poster}></img>
            <p>{this.state.description}</p>
            <h1>Edit Movie Details</h1>
            <form onSubmit={this.handleSubmit} className="edit-movie-form">
             <input
               required 
               value={this.state.title} 
               onChange={(event) => this.handleChangeFor(event, 'title')} 
               placeholder="Title"/>
             <input
               required 
               value={this.state.poster} 
               onChange={(event) => this.handleChangeFor(event, 'poster')} 
               placeholder="Poster URL"/>
             <textarea
               required 
               value={this.state.description} 
               onChange={(event) => this.handleChangeFor(event, 'description')} 
               placeholder="description"/>
             <select
               required 
               value={this.state.genre_id} 
               onChange={(event) => this.handleChangeFor(event, 'genre_id')}>
               <option hidden value="">Genre</option>   
                {this.props.reduxState.genres.map((genre) => {
                   return(
                      <option key={genre.id} value={genre.id}>{genre.name}</option>
                   )
                })}
             </select>
             <button type="submit">Submit Update</button>
          </form>
          <button onClick={this.returnToGallery}>Return to Gallery</button>
          <button onClick={this.returnToDetails}>Return to Details Page</button>
         </>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(withRouter(EditDetails));