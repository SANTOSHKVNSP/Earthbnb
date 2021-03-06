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
var SlickSlideShow = require('./components/SlickSlideShow.jsx');
var NavBar = require('./components/NavBar.jsx');
var PropertySearch = require('./components/PropertySearch.jsx');
var AdminNavBar = require('./components/AdminNavBar.jsx');
var EditProfile = require('./components/EditProfile.jsx');
var ShowProfile = require('./components/ShowProfile.jsx');
var ListingsIndex = require('./components/ListingsIndex.jsx');
var AddListing = require('./components/AddListing.jsx');
var ShowProperty = require('./components/ShowProperty.jsx');
var TripIndex = require('./components/ReservationsIndex.jsx');

var setSlideShowHeight = function() {
  var slideShow = $(".slick-container")
  var proportionalHeight = slideShow.width() * (7 / 19)
  var height = proportionalHeight < 400 ? 400 : proportionalHeight
  slideShow.css('height', height)
}

var App = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  componentDidMount: function () {
    ClientActions.fetchPropertyTypes();
  },

  go: function (lat, lng) {
    this.lat = lat;
    this.lng = lng;
    this.context.router.push("/search");
  },

  render: function () {
    if (this.props.location.pathname === "/") {
      return(
        <SlideShow redirectCallback={this.go} />
      );
    } else {
      if (this.lat && this.lng) {
        var passedLat = this.lat;
        var passedLng = this.lng;
        this.lat = undefined;
        this.lng = undefined;
        return(
          <div className="app-root">
            <NavBar redirectCallback={this.go} />
            <PropertySearch startingLat={passedLat} startingLng={passedLng} />
          </div>
        );
      } else {
        return(
          <div className="app-root">
            <NavBar redirectCallback={this.go} />
            {this.props.children}
          </div>
        );
      }
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
      <Route path="/user/trips" component={TripIndex} />
    </Route>
    <Route path="/add-a-listing" component={AddListing} />
    <Route path="/search" component={PropertySearch} />
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

window.addEventListener("resize", setSlideShowHeight);
window.addEventListener("load", setSlideShowHeight);
