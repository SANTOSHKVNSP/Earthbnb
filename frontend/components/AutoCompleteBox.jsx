var React = require('react');

var AutoCompleteBox = React.createClass({

  getInitialState: function () {
    return({
      number: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    });
  },

  componentDidMount: function(){
    this.initAutocomplete();
  },

  initAutocomplete: function() {
    autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')),
      {types: ['geocode']}
    );
    autocomplete.addListener('place_changed', this.fillInAddress);
  },

  fillInAddress: function () {
    var place = autocomplete.getPlace();
    this.setState({
      number: place.address_components[0].long_name,
      street: place.address_components[1].long_name,
      city: place.address_components[4].long_name,
      state: place.address_components[6].long_name,
      country: place.address_components[7].long_name,
      zip: place.address_components[8].long_name
    });
  },

  render: function () {
    return(
      <div>
        <div id="locationField">
          <input id="autocomplete" placeholder="Enter your address" type="text"></input>
        </div>

        <table id="address">
          <tbody>
          <tr>
            <td class="label">Street address</td>
            <td class="slimField"><input class="field" id="street_number"
                  disabled="true"></input></td>
            <td class="wideField" colspan="2"><input class="field" id="route"
                  disabled="true"></input></td>
          </tr>
          <tr>
            <td class="label">City</td>
            <td class="wideField" colspan="3"><input class="field" id="locality"
                  disabled="true"></input></td>
          </tr>
          <tr>
            <td class="label">State</td>
            <td class="slimField"><input class="field"
                  id="administrative_area_level_1" disabled="true"></input></td>
            <td class="label">Zip code</td>
            <td class="wideField"><input class="field" id="postal_code"
                  disabled="true"></input></td>
          </tr>
          <tr>
            <td class="label">Country</td>
            <td class="wideField" colspan="3"><input class="field"
                  id="country" disabled="true"></input></td>
          </tr>
          </tbody>
        </table>

        <div className="map" ref="map"></div>
      </div>
    );
  }

});

module.exports = AutoCompleteBox;
