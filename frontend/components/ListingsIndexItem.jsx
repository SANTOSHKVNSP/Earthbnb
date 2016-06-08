var React = require('react');
var ClientActions = require('../actions/ClientActions.js');

var ListingsIndexItem = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  redirect: function () {
    this.context.router.push("/listings/" + this.props.listing.id);
  },

  handleEditClick: function () {
    this.context.router.push("user/listings/" + this.props.listing.id + "/edit");
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

  render: function () {
    return(
      <li className="listing-index-item">
        <header>
          {this.props.listing.title}
        </header>
        <form className="group">
          <img onClick={this.redirect} className="listing-index-item-pic" src={this.props.listing.image_url} />
          {this.renderButtons()}
        </form>
      </li>
    );
  }
});

module.exports = ListingsIndexItem;
