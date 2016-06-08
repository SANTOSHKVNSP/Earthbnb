var React = require('react');
var Map = require('./Map.jsx');
var PropertySearchResults = require('./PropertySearchResults.jsx');

var PropertySearch = React.createClass({

  render: function () {
    return(
      <div id="search-container" className="group">
        <PropertySearchResults />
        <Map startingLat={this.props.startingLat} startingLng={this.props.startingLng} />
      </div>
    );
  }
});

module.exports = PropertySearch;
