import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import MovieGallery from '../MovieGallery/MovieGallery'
import MovieGalleryDetails from '../MovieGalleryDetails/MovieGalleryDetails'
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>Movies!</h1>
        <Router>
          <Route exact path="/" component={MovieGallery} />
          <Route exact path="/details" component={MovieGalleryDetails}/>
        </Router>
      </div>
    );
  }
}

export default App;
