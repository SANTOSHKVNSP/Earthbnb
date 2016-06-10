var React = require('react');

var ClientActions = require('../actions/ClientActions.js');


var WhereTo = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function() {
    return({
      lat: 0,
      lng: 0
    });
  },

  componentDidMount: function () {

    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete2 = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete-middle')),
        {types: ['geocode']});
    // When the user selects an address from the dropdown, redirect to a search form
    autocomplete2.addListener('place_changed', this.go);
  },

  go: function () {
    this.props.redirectCallback(
      autocomplete2.getPlace().geometry.location.lat(),
      autocomplete2.getPlace().geometry.location.lng()
    );
  },

  renderAutoComplete: function () {
    return(
      <div className="autocomplete-container">
        <input id="autocomplete-nav" placeholder="Where to?" type="text"></input>
      </div>
    );
  },

  render: function () {
    return(
      <div>
        <div className="where-to-background">
        </div>
        <div className="where-to">
          <input id="autocomplete-middle" placeholder="Where to?" type="text"></input>
        </div>
      </div>
    );
  }
});

module.exports = WhereTo;
