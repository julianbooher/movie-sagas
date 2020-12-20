import React, { Component } from 'react';
import {Link, HashRouter as Router, Route} from 'react-router-dom';
import MovieGallery from '../MovieGallery/MovieGallery'
import MovieGalleryDetails from '../MovieGalleryDetails/MovieGalleryDetails'
import SubmissionView from '../SubmissionView/SubmissionView'
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>Movies!</h1>
        <Router>
        <nav>
          <ul>
            <li><Link to ="/">Gallery Home</Link></li>
            <li><Link to ="/submission">Submit a Movie</Link></li>
          </ul>
        </nav>
          <Route exact path="/" component={MovieGallery} />
          <Route path="/details" component={MovieGalleryDetails}/>
          <Route path="/submission" component={SubmissionView}/>
        </Router>
      </div>
    );
  }
}

export default App;
