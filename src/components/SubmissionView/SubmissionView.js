import React, { Component } from "react";
import { connect } from "react-redux";
import './SubmissionView.css'
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublishIcon from '@material-ui/icons/Publish';



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
   leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
   
 });

const defaultState = {
   genre_id: '',
   title: '',
   poster: '',
   description: ''
}

class SubmissionView extends Component {

   
   state = {...defaultState, open: false};

   // get the genres and put them in redux.
   componentDidMount() {
      this.props.dispatch({type: 'FETCH_GENRES'});
      this.setState({
         labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
       });
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
     this.props.dispatch({type: 'ADD_MOVIE', payload: this.state});
     this.setState({...defaultState, open: true});
  }

  handleClose = () => {
     this.setState({open: false})
  }

  goToGallery = () => {
     this.props.history.push('/')
  }

  render() {  
   const { classes } = this.props;   
   return (
      <div>
         <h1>Submit a Movie</h1>
         <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">{"Movie Submitted!"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
               Movie submitted to the database! Thank you for your contribution.
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={this.goToGallery} color="primary">
               Go to Gallery
               </Button>
               <Button onClick={this.handleClose} color="primary" autoFocus>
               Submit Another Movie
               </Button>
            </DialogActions>
         </Dialog>
         
         <form onSubmit={this.handleSubmit} className="movie-form">
            <div className="movie-form-textfield">
               <TextField
                  id="movie-form-title"
                  required
                  variant="outlined"
                  style={{width: 250}}
                  className={classes.textField}
                  label="Title" 
                  value={this.state.title} 
                  onChange={(event) => this.handleChangeFor(event, 'title')} />

            </div>
            <div className="movie-form-textfield">
               <TextField
                  id="movie-form-url"
                  required 
                  variant="outlined"
                  style={{width: 350}}
                  className={classes.textField}
                  value={this.state.poster} 
                  onChange={(event) => this.handleChangeFor(event, 'poster')} 
                  label="Poster URL"/>
            </div>
            <div className="movie-form-textfield">
               <TextField
                  required 
                  id="movie-form-url" 
                  variant="outlined"
                  multiline
                  rows="8"
                  style={{width: 350}}
                  className={classes.textField}
                  value={this.state.description} 
                  onChange={(event) => this.handleChangeFor(event, 'description')} 
                  label="Description"/>
            </div>
            <div className="movie-form-dropdown">
               <FormControl
               variant="outlined" 
               required 
               className={classes.formControl}
               >
                  <InputLabel
                  ref={ref => {
                     this.InputLabelRef = ref;
                   }}
                   htmlFor="outlined-genre-simple">
                      Genre
                  </InputLabel>
                  <Select
                     value={this.state.genre_id}
                     onChange={(event) => this.handleChangeFor(event, 'genre_id')}
                     input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="genre"
                          id="outlined-genre-simple"
                        />
                      }>
                     <MenuItem value="">
                     <em>Genre</em>
                     </MenuItem>
                     {this.props.genres.map((genre) => {
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
               <PublishIcon className={classes.leftIcon}/>
               Submit Film
            </Button>

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

export default withStyles(styles)(connect(mapReduxStateToProps)(SubmissionView));
