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
          console.log(this.state.properties[key]);
          return (
            <PropertySearchResult key={key} property={this.state.properties[key]} />
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = PropertySearchResults;

// <li key={key} className="search-result">
//   <img onClick={this.gotoProperty} src={this.state.properties[key].full_image_url} />
//   <div className="search-result-info">
//     <span onClick={this.gotoProperty}>{this.state.properties[key].title}</span>
//   </div>
// </li>
