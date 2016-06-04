var React = require('react');
var Map = require('./Map.jsx');

var AddListing = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      listings: []
    });
  },

  render: function () {
    return(
      <div className="add-listing-container">
        <section className="add-listing">
          <h1>Add a Listing</h1>
          <h2>Where's your place located?</h2>
          <input placeholder="Your full address"/>
          <Map />
        </section>
      </div>
    );
  }

});

module.exports = AddListing;
