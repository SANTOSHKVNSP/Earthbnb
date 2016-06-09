var React = require('react');
var PropertyStore = require('../stores/PropertiesStore.js');
var ClientActions = require('../actions/ClientActions.js');
var PropertySearchResult = require('./PropertySearchResult.jsx');

var PropertySearchResults = React.createClass({

  getInitialState: function () {
    return({
      properties: PropertyStore.all()
    });
  },

  updateState: function () {
    this.setState({
      properties: PropertyStore.all()
    });
  },

  componentDidMount: function () {
    this.listener = PropertyStore.addListener(this.updateState);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },


  render: function () {
    return (
      <ul className="search-results">
        {Object.keys(this.state.properties).map(function (key) {
          return (
            <PropertySearchResult key={key} property={this.state.properties[key]} />
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = PropertySearchResults;
