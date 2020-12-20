import React, { Component } from "react";
import { connect } from "react-redux";
import './SubmissionView.css'

class SubmissionView extends Component {

   state = {
      genreId: '',
      title: '',
      poster: '',
      description: ''
   }

   componentDidMount() {
      this.props.dispatch({type: 'FETCH_GENRES'});
      console.log('reduxState submissionView', this.props.genres);
   }

  // TODO - Selector for genre
  handleChangeFor = (event, inputName) => {
     this.setState({
     [inputName]: event.target.value
     })
   
  }

  handleSubmit = (event) => {
     event.preventDefault();
     console.log('inside handleSubmit')

  }

  render() {
    return (
       <div>
          {JSON.stringify(this.state)}
          <br></br>
          {JSON.stringify(this.props.genres)}
          <form onSubmit={this.handleSubmit} className="movie-form">
             <input 
               value={this.state.title} 
               onChange={(event) => this.handleChangeFor(event, 'title')} 
               placeholder="Title"/>
             <input 
               value={this.state.poster} 
               onChange={(event) => this.handleChangeFor(event, 'poster')} 
               placeholder="Poster URL"/>
             <input 
               value={this.state.description} 
               onChange={(event) => this.handleChangeFor(event, 'description')} 
               placeholder="description"/>
             <select 
               value={this.state.genreId} 
               onChange={(event) => this.handleChangeFor(event, 'genreId')}>
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
          <h1>Poster Preview</h1>
          <img src={this.state.poster} alt={this.state.poster}></img>
       </div>
       
    );
  }
}
const mapReduxStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapReduxStateToProps)(SubmissionView);
