var React = require('react');
var PropertyStore = require('../stores/PropertiesStore.js');
var ClientActions = require('../actions/ClientActions.js');

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
            <li key={key}>
              {this.state.properties[key].title}
            </li>
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = PropertySearchResults;
