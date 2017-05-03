import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Layout from './components/layout'

const app = document.getElementById('app');
ReactDOM.render(
 <Layout/>,
app);

{/*<Router history={hashHistory}>
    <Route path='/' component={Layout}>
        <IndexRoute component={Source}></IndexRoute>
        {/*<Route path='headlines' component={Headlines}></Route>
        <Route path='options' component={Options}></Route>*/}
    {/*</Route>
</Router>*/}