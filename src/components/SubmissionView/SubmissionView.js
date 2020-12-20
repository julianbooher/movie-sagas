import React, { Component } from "react";
import { connect } from "react-redux";
import './SubmissionView.css'
const defaultState = {
   genre_id: '',
   title: '',
   poster: '',
   description: ''
}

class SubmissionView extends Component {

   state = defaultState;

   // get the genres and put them in redux.
   componentDidMount() {
      this.props.dispatch({type: 'FETCH_GENRES'});
   }

   handleChangeFor = (event, inputName) => {
      this.setState({
      [inputName]: event.target.value
      })
  }

  handleSubmit = (event) => {
     event.preventDefault();
     // dispatch to redux on submit.
     // TODO add input validation.
     this.props.dispatch({type: 'ADD_MOVIE', payload: this.state})
     this.setState(defaultState)
  }

  render() {
    return (
       <div>
          <h1>Submit a Movie</h1>
          <form onSubmit={this.handleSubmit} className="movie-form">
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
                {this.props.genres.map((genre) => {
                   return(
                      <option key={genre.id} value={genre.id}>{genre.name}</option>
                   )
                })}
             </select>
             <button type="submit">Submit Film</button>

          </form>
          {/* This preview is to ensure the poster looks good before the user submits it. */}
          <h1>Movie Info Preview</h1>
          <h1>{this.state.title}</h1>
          <img src={this.state.poster} alt={this.state.poster}></img>
          <p>{this.state.description}</p>
       </div>
       
    );
  }
}
const mapReduxStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapReduxStateToProps)(SubmissionView);
