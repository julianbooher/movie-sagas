import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import './MovieGalleryDetails.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
   button: {
     margin: theme.spacing(1),
   },
   leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
 });

class MovieGalleryDetails extends Component {

   // state is coming from the router history, will be the movie id.
   state = this.props.location.state


   // Getting the details of this particular movie, storing them in redux to display on the dom.
   componentDidMount = () => {
      // if clause in case the user comes to this page not from clicking one of the posters.
      if (this.state){
         this.props.dispatch({type: 'FETCH_DETAILS', payload: this.state.movieId});
         this.props.dispatch({type: 'FETCH_DETAILS_GENRES', payload: this.state.movieId})
      }
   }

   // Button to take the user back to the gallery.
   returnToGallery = () => {
      console.log('inside returnToGallery')
      this.props.history.push('/')
   }

   // Button to take the user to the edit details page
   editDetails = () => {
      this.props.history.push('/edit');
   }

   deleteMovie = () => {
      console.log('inside deleteMovie', this.props.reduxState.details.id);
      this.props.dispatch({type: 'DELETE_MOVIE', payload: this.props.reduxState.details.id});
      this.props.history.push('/');
   }

   // this creates the list of genres to be displayed below the movie poster.
   createGenreString = (genreArray) => {
      let returnString = '| '
      if (genreArray !== undefined){
         // if no genres, displays None Listed
         if (genreArray.length === 0){
            return 'None Listed'
         }
         for (let genre of genreArray){
            returnString += ` ${genre.name} |`
         }
         return returnString;
      }
   }

   render() {
      const { classes } = this.props;   

      return (
         <>
            {this.state && 
            <div className="movie-details-item">
               <h1>{this.props.reduxState.details.title}</h1>
               <img src={this.props.reduxState.details.poster} alt={this.props.reduxState.details.title}/>
               <p className="genres-title">Genres</p>
               {this.createGenreString(this.props.reduxState.details.genres)}
               <p className="genres-title">Description</p>
               <p className="description">{this.props.reduxState.details.description}</p>
            </div>
            }
            <Button
               variant="outlined" 
               color="primary"
               className={classes.button} 
               onClick={this.returnToGallery}>
               <ArrowBackIcon className={classes.leftIcon}/>
               Return to Gallery
            </Button>
            
            {this.state !== null &&
            <> 
            <Button
               variant="outlined" 
               color="primary"
               className={classes.button} 
               onClick={this.editDetails}>
               <EditIcon className={classes.leftIcon}/>
               Edit Movie Details
            </Button>
            <div>
            <Button
               variant="outlined" 
               color="secondary"
               className={classes.button} 
               onClick={this.deleteMovie}>
               <DeleteIcon className={classes.leftIcon}/>
               Delete Movie
            </Button>
            </div>
            </>
            }
            
         </>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default withStyles(styles)(connect(mapStateToProps)(withRouter(MovieGalleryDetails)));