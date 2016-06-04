var React = require('react');

var AdminNavBar = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      ProfileClass: "not-on-page",
      ListingClass: "not-on-page",
      TripsClass: "not-on-page"
    });
  },

  resetState: function (callback) {
    this.setState({
      ProfileClass: "not-on-page",
      ListingClass: "not-on-page",
      TripsClass: "not-on-page"
    }, callback);
  },

  componentDidMount: function () {
    switch(this.props.location.pathname){
      case "/user/edit":
        this.resetState(function () { this.setState({ProfileClass: "on-page"}); }.bind(this));
        break;
      case "/user/listings":
        this.resetState(function () { this.setState({ListingClass: "on-page"}); }.bind(this));
        break;
    }
  },

  componentWillReceiveProps: function (nextProps) {
    switch(nextProps.location.pathname){
      case "/user/edit":
        this.resetState(function () { this.setState({ProfileClass: "on-page"}); }.bind(this));
        break;
      case "/user/listings":
        this.resetState(function () { this.setState({ListingClass: "on-page"}); }.bind(this));
        break;
    }
  },

  handleProfileClick: function () {
    this.context.router.push("/user/edit");
  },
  handleListingsClick: function () {
    this.context.router.push("/user/listings");
  },
  handleTripsClick: function () {
    this.context.router.push("/user/trips");
  },

  render: function () {
    return(
      <div>
        <nav className={"admin-nav-bar"}>
          <ul className="group">
            <li className={this.state.ProfileClass} onClick={this.handleProfileClick}>Profile</li>
            <li className={this.state.ListingClass} onClick={this.handleListingsClick}>Your Listings</li>
            <li className={this.state.TripsClass} onClick={this.handleTripsClick}>Your Trips</li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
});

module.exports = AdminNavBar;
