var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var ErrorsStore = require('./stores/ErrorsStore.js');
var PropertyTypeStore = require('./stores/PropertyTypeStore.js');
var ClientActions = require('./actions/ClientActions.js');

var SlideShow = require('./components/SlideShow.jsx');
var NavBar = require('./components/NavBar.jsx');
var PropertySearch = require('./components/PropertySearch.jsx');
var AdminNavBar = require('./components/AdminNavBar.jsx');
var EditProfile = require('./components/EditProfile.jsx');
var ShowProfile = require('./components/ShowProfile.jsx');
var ListingsIndex = require('./components/ListingsIndex.jsx');
var AddListing = require('./components/AddListing.jsx');
var ShowProperty = require('./components/ShowProperty.jsx');

var App = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  componentDidMount: function () {
    ClientActions.fetchPropertyTypes();
  },

  render: function () {
    if (this.props.location.pathname === "/") {
      return(
        <div>
          {this.props.children}
        </div>
      );
    } else {
      return(
        <div>
          <NavBar />
          {this.props.children}
        </div>
      );
    }
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SlideShow} />
    <Route path="/user" component={AdminNavBar}>
      <Route path="/user/edit" component={EditProfile} />
      <Route path="/user/listings" component={ListingsIndex} />
      <Route path="/user/listings/:listingId/edit" component={AddListing} />
    </Route>
    <Route path="/add-a-listing" component={AddListing} />
    <Route path="/users/:userId" component={ShowProfile} />
    <Route path="/listings/:listingId" component={ShowProperty} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function(){
  Modal.setAppElement(document.body);
  ReactDOM.render(
    <Router onUpdate={function () {window.scrollTo(0, 0);}} history={hashHistory} routes={routes} />,
    document.getElementById("content")
  );
});
