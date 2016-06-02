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

  componentDidMount: function () {
    console.log(this.props.location.pathname);
    switch(this.props.location.pathname){
      case "/user/edit":
        this.setState({ProfileClass: "on-page"});
        break;
    }
  },

  render: function () {
    return(
      <div>
        <nav className={"admin-nav-bar"}>
          <ul className="group">
            <li className={this.state.ProfileClass}>Profile</li>
            <li className={this.state.ListingClass}>Your Listings</li>
            <li className={this.state.TripsClass}>Your Trips</li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
});

module.exports = AdminNavBar;
