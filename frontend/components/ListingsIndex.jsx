var React = require('react');

var PropertiesStore = require('../stores/PropertiesStore.js');

var ListingsIndex = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      listings: []
    });
  },

  componentDidMount: function () {
    this.listener = PropertiesStore.addListener(this.getProperties);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },

  getProperties: function () {

  },

  handleAddNewListingClick: function () {
    this.context.router.push("/add-a-listing");
  },

  render: function () {
    return(
      <div>
        Listings Index
        <button onClick={this.handleAddNewListingClick} className="white-button">Add New Listing</button>
      </div>
    );
  }

});

module.exports = ListingsIndex;
