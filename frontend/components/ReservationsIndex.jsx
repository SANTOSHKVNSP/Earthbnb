var React = require('react');

var ReservationsStore = require('../stores/ReservationsStore.js');
var UserStore = require('../stores/UserStore.js');
var ClientActions = require('../actions/ClientActions.js');
var ReservationsIndexItem = require('./ReservationsIndexItem.jsx');

var ReservationsIndex = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      currentUser: null,
      reservations: []
    });
  },

  componentDidMount: function () {
    this.listener = ReservationsStore.addListener(this.getReservations);
    this.userListener = UserStore.addListener(this.getUser);
    ClientActions.fetchUser();
  },
  componentWillUnmount: function () {
    this.listener.remove();
    this.userListener.remove();
  },

  getUser: function () {
    this.setState({currentUser: UserStore.user}, function () {
      ClientActions.fetchUserReservations(this.state.currentUser().id);
    });
  },

  getReservations: function () {
    this.setState({reservations: ReservationsStore.all()});
  },

  render: function () {
    if (this.state.reservations.length > 0) {
      return(
        <ul className="listing-index">
          {this.state.reservations.map(function (reservation, index) {
            return(
              <ReservationsIndexItem key={index} reservation={reservation} />
            );
          })}
        </ul>
      );
    } else {
      return(
        <ul className="listing-index">
          <div className="no-trips">
            You have no trips scheduled.
          </div>
        </ul>
      );
    }
  }

});

module.exports = ReservationsIndex;
