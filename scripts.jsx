import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './app/components/layout';
// import { HashRouter as Router, Route } from 'react-router.dom';

/* <Router>
    <Route exact path = '/' component={home}/>
    <Route path = '/layout' component={Layout} />
    <Route path = '/favourites' component={Favourites} />
    </Router>*/

const app = document.getElementById('app');
ReactDOM.render(<Layout />, app);
