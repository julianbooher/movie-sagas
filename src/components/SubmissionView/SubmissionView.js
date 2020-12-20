import React, { Component } from "react";
import { connect } from "react-redux";
import './SubmissionView.css'

class SubmissionView extends Component {

   state = {
      genre: null
   }

   componentDidMount() {
   }

  // TODO - Selector for genre
  handleChange = (event) => {
     this.setState({
     category: event.target.value
     })
   
  }

  render() {
    return (
       <div>

       </div>
       
    );
  }
}
const mapReduxStateToProps = (reduxStore) => {
  return reduxStore;
};

export default connect(mapReduxStateToProps)(SubmissionView);
