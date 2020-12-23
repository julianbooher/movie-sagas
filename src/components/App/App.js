import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import MovieGallery from '../MovieGallery/MovieGallery'
import MovieGalleryDetails from '../MovieGalleryDetails/MovieGalleryDetails'
import SubmissionView from '../SubmissionView/SubmissionView'
import EditDetails from '../EditDetails/EditDetails'
import Header from '../Header/Header'
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route exact path="/" component={MovieGallery} />
          <Route path="/details" component={MovieGalleryDetails}/>
          <Route path="/submission" component={SubmissionView}/>
          <Route path="/edit" component={EditDetails}/>
        </Router>
      </div>
    );
  }
}

export default App;
