import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import './EditDetails.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
   button: {
     margin: theme.spacing(1),
   },
   input: {
     display: 'none',
   },
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
   selectEmpty: {
      marginTop: theme.spacing(2),
   },
 });

class EditDetails extends Component {

   // 
   state = {
      id: '',
      title: '',
      poster: '',
      description: '',
      genre_id: '',
      open: false
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
      this.setState ({
         open: true
      })
   }

   // Button to take the user back to the details page.
   goToDetails = () => {
      console.log('inside returnToDetails')
      this.props.history.push({pathname: `/details`, state: {movieId: this.state.id}})
   }

   // Button to take the user back to the gallery.
   goToGallery = () => {
      console.log('inside returnToGallery')
      this.props.history.push('/')
   }


   handleClose = () => {
      this.setState({open: false})
   }

   render() {
      const { classes } = this.props;   
      return (
         <>
         <div className="movie-details-preview">
            <h1>Updated Details Preview</h1>
            <h3>{this.state.title}</h3>
            <img src={this.state.poster} alt={this.state.poster}></img>
            <p>{this.state.description}</p>
         </div>
            <h1>Edit Movie Details</h1>
            <Dialog
               open={this.state.open}
               onClose={this.handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Movie Details Updated!"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
               Details for this movie have been updated.
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={this.goToGallery} color="primary">
               Go to Gallery
               </Button>
               <Button onClick={this.goToDetails}>Go Back to Movie Details</Button>
               <Button onClick={this.handleClose} color="primary" autoFocus>
               Close
               </Button>
            </DialogActions>
         </Dialog>
            <form onSubmit={this.handleSubmit} className="edit-movie-form">
            <div className="edit-movie-form-textfield">
               <TextField
                  id="edit-movie-form-title"
                  required
                  variant="outlined"
                  style={{width: 250}}
                  className={classes.textField}
                  label="Title" 
                  value={this.state.title} 
                  onChange={(event) => this.handleChangeFor(event, 'title')} />

            </div>
            <div className="edit-movie-form-textfield">
               <TextField
                  id="edit-movie-form-url"
                  required 
                  variant="outlined"
                  style={{width: 350}}
                  className={classes.textField}
                  value={this.state.poster} 
                  onChange={(event) => this.handleChangeFor(event, 'poster')} 
                  label="Poster URL"/>
            </div>
            <div className="edit-movie-form-textfield">
               <TextField
                  required 
                  id="edit-movie-form-url"
                  required 
                  variant="outlined"
                  multiline
                  rows="8"
                  style={{width: 350}}
                  className={classes.textField}
                  value={this.state.description} 
                  onChange={(event) => this.handleChangeFor(event, 'description')} 
                  label="Description"/>
            </div>
            <div className="edit-movie-form-dropdown">
               <FormControl 
               required 
               className={classes.formControl}
               >
                  <InputLabel>Genre</InputLabel>
                  <Select
                     value={this.state.genre_id}
                     onChange={(event) => this.handleChangeFor(event, 'genre_id')}>
                     <MenuItem value="">
                     <em>Genre</em>
                     </MenuItem>
                     {this.props.reduxState.genres.map((genre) => {
                        return(
                           <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                        )
                     })}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
               </FormControl>
            </div>
            <Button 
               variant="outlined" 
               color="primary" 
               type="submit"
               className={classes.button}>
                Submit Edit
            </Button>

         </form>
         <Button
            variant="outlined" 
            color="primary"
            className={classes.button} 
            onClick={this.goToGallery}>
            Return to Gallery
         </Button>
         <Button
            variant="outlined" 
            color="primary"
            className={classes.button} 
            onClick={this.goToDetails}>
            Return to Details Page
         </Button>
         </>
      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default withStyles(styles)(connect(mapStateToProps)(withRouter(EditDetails)));