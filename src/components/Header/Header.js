import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import './Header.css'



class Header extends Component {

   render() {
      return (
        <header className="app-header">
          <h1>Movies!</h1>
          <nav>
            <ul>
              <li><Link to ="/">Gallery Home</Link></li>
              <li><Link to ="/submission">Submit a Movie</Link></li>
            </ul>
          </nav>

        </header>

      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(Header);



