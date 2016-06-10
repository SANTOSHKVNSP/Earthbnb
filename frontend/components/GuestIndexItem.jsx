var React = require('react');

var GuestIndexItem = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  redirectToGuestProfile: function () {
    this.context.router.push("/users/" + this.props.reservation.user_id);
  },

  render: function () {
    var check_in = new Date(this.props.reservation.check_in);
    var check_out = new Date(this.props.reservation.check_out);
    console.log(this.props.guestImage);
    return(
      <div className="guest-index-item group">
        <img onClick={this.redirectToGuestProfile} className="guest-pic" src={this.props.guestImage} />
        <div className="guest-index-item-text">
          Name: {this.props.guest}<br />
          Check In: {(check_in.getMonth() + 1) + "/" + check_in.getDate() + "/" + check_in.getFullYear()}<br />
          Check Out: {(check_out.getMonth() + 1) + "/" + check_out.getDate() + "/" + check_out.getFullYear()}<br />
          Guests: {this.props.reservation.guests}<br />
        </div>
      </div>
    );
  }
});

module.exports = GuestIndexItem;
