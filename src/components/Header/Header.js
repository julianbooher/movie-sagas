import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import './Header.css'



class Header extends Component {

   render() {
      return (
        <div className="header-div">
        <header className="app-header">
        </header>
          <nav>
            <ul>
              <li><Link to ="/">Gallery Home</Link></li>
              <li><Link to ="/submission">Submit a Movie</Link></li>
            </ul>
          </nav>
          </div>

      );
   }

}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(Header);



