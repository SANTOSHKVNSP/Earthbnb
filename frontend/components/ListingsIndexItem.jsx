var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var GuestIndexItem = require('./GuestIndexItem.jsx');

var ListingsIndexItem = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  redirect: function () {
    this.context.router.push("/listings/" + this.props.listing.id);
  },

  handleEditClick: function () {
    this.context.router.push("/user/listings/" + this.props.listing.id + "/edit");
  },

  handleDeleteClick: function () {
    ClientActions.deleteProperty(this.props.listing.id);
  },

  renderButtons: function () {
    if (this.props.editButton) {
      return(
        <div id="listing-index-item-button-container">
          <button onClick={this.handleEditClick} id="edit-listing-button" className="white-button">Edit This Listing</button><br />
          <button onClick={this.handleDeleteClick} id="delete-listing-button" className="white-button">Delete This Listing</button>
        </div>
      );
    }
  },

  renderReservationsHeader: function () {
    if (this.props.listing.reservations.length > 0) {
      return(<div className="reservations-header">Reservations</div>);
    } else {
      return(<div className="reservations-header">(No Reservations)</div>);
    }
  },

  renderReservationList: function () {
    if (this.props.editButton) {
      return(
        <section className="listing-reservations-list">
          {this.renderReservationsHeader()}
          {this.props.listing.reservations.map(function (reservation, index) {
            return(
              <GuestIndexItem key={index} reservation={reservation} guest={this.props.listing.user_names[index].name} guestImage={this.props.listing.user_images[index].image_url} />
            );
          }.bind(this))}
        </section>
      );
    }
  },

  render: function () {
    return(
      <li className="listing-index-item">
        <header>
          {this.props.listing.title}
        </header>
        <section className="listing-index-item-form">
          <div className="group">
            <img onClick={this.redirect} className="listing-index-item-pic" src={this.props.listing.image_url} />
            {this.renderButtons()}
          </div>
          {this.renderReservationList()}
        </section>
      </li>
    );
  }
});

module.exports = ListingsIndexItem;
