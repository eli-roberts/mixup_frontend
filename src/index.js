import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationView from './components/ApplicationView.js'
import MixUpNav from './components/nav/Navbar.js'

ReactDOM.render(
  <Router>
    <MixUpNav/>
    <ApplicationView />
  </Router>,
  document.getElementById('root')
);
