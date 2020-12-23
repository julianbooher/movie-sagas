import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import './EditDetails.css'


class EditDetails extends Component {

   // 
   state = {
      details:{},
   }


   // Setting state to this particular movie's details from redux.
   componentDidMount = () => {
      // if clause in case the user comes to this page not from clicking one of the posters.
      this.setState({
         details: this.props.reduxState.details,
      })
   }

   handleChangeFor = (event, inputName) => {
      this.setState({
      [inputName]: event.target.value
      })
   }

   handleSubmit = (event) => {
      event.preventDefault();
      console.log('inside handleSubmit')
   }


   // Button to take the user back to the gallery.
   returnToGallery = () => {
      console.log('inside returnToGallery')
      this.props.history.push('/')
   }

   render() {

      return (
         <>
            {JSON.stringify(this.state)}
            <h1>Edit Movie Details</h1>
            <form onSubmit={this.handleSubmit} className="edit-movie-form">
             <input
               required 
               value={this.state.details.title} 
               onChange={(event) => this.handleChangeFor(event, 'title')} 
               placeholder="Title"/>
             <input
               required 
               value={this.state.details.poster} 
               onChange={(event) => this.handleChangeFor(event, 'poster')} 
               placeholder="Poster URL"/>
             <textarea
               required 
               value={this.state.details.description} 
               onChange={(event) => this.handleChangeFor(event, 'description')} 
               placeholder="description"/>
             {/* <select
               required 
               value={this.state.genre_id} 
               onChange={(event) => this.handleChangeFor(event, 'genre_id')}>
               <option hidden value="">Genre</option>
                {this.props.genres.map((genre) => {
                   return(
                      <option key={genre.id} value={genre.id}>{genre.name}</option>
                   )
                })}
             </select> */}
             <button type="submit">Submit Film</button>

          </form>
         </>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(withRouter(EditDetails));