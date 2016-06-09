var React = require('react');
var ClientActions = require('../actions/ClientActions.js');

var ReservationsIndexItem = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  redirect: function () {
    this.context.router.push("/listings/" + this.props.reservation.property.id);
  },

  handleDeleteClick: function () {
    ClientActions.deleteReservation(this.props.reservation.id);
  },

  renderButtons: function () {
    return(
      <div id="listing-index-item-button-container">
        <button onClick={this.handleDeleteClick} id="delete-listing-button" className="white-button">Cancel This Reservation</button>
      </div>
    );
  },

  render: function () {
    var check_in = new Date(this.props.reservation.check_in);
    var check_out = new Date(this.props.reservation.check_out);
    return(
      <li className="listing-index-item">
        <header>
          {this.props.reservation.property.title}
        </header>
        <section className="listing-index-item-form group">
          <img onClick={this.redirect} className="listing-index-item-pic" src={this.props.reservation.image_url} />
          <div className="reservation-text-container">
            Check In: {(check_in.getMonth() + 1) + "/" + check_in.getDate() + "/" + check_in.getFullYear()}<br />
            Check Out: {(check_out.getMonth() + 1) + "/" + check_out.getDate() + "/" + check_out.getFullYear()}<br />
            Guests: {this.props.reservation.guests}<br />
          </div>
          {this.renderButtons()}
        </section>
      </li>
    );
  }
});

module.exports = ReservationsIndexItem;
