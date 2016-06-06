var React = require('react');

var PropertiesStore = require('../stores/PropertiesStore.js');
var UserStore = require('../stores/UserStore.js');
var ClientActions = require('../actions/ClientActions.js');

var ListingsIndex = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      currentUser: null,
      listings: []
    });
  },

  componentDidMount: function () {
    this.listener = PropertiesStore.addListener(this.getProperties);
    this.userListener = UserStore.addListener(this.getUser);
    ClientActions.fetchUser();
  },
  componentWillUnmount: function () {
    this.listener.remove();
    this.userListener.remove();
  },

  getUser: function () {
    this.setState({currentUser: UserStore.user}, function () {
      ClientActions.fetchUserProperties(this.state.currentUser().id);
    });
  },

  getProperties: function () {
    this.setState({listings: PropertiesStore.all()});
  },

  handleAddNewListingClick: function () {
    this.context.router.push("/add-a-listing");
  },

  render: function () {

    return(
      <div>
        {this.state.listings.length}
        <button onClick={this.handleAddNewListingClick} className="white-button">Add New Listing</button>
      </div>
    );
  }

});

module.exports = ListingsIndex;
