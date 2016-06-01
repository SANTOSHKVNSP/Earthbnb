var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var ErrorsStore = require('./stores/ErrorsStore.js');

var NavBar = require('./components/NavBar.jsx');
var PropertySearch = require('./components/PropertySearch.jsx');
var SignUpForm = require('./components/SignUpForm.jsx');
var LogInForm = require('./components/LogInForm.jsx');
var AdminNavBar = require('./components/AdminNavBar.jsx');

var App = React.createClass({
  render: function () {
    return(
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={PropertySearch} />
    <Route path="/signup" component={SignUpForm}/>
    <Route path="/login" component={LogInForm}/>
    <Route path="/users/edit" component={AdminNavBar}/>
  </Route>
);

document.addEventListener(
  "DOMContentLoaded",
  function(){
    ReactDOM.render(
      <Router history={hashHistory} routes={routes} />,
      document.getElementById("content")
    );
  }
);
