var React = require('react');
var AutoCompleteBox = require('./AutoCompleteBox.jsx');

var AddListing = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      saving: false,
      autoCompleteInput: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      apt: ""
    });
  },

  componentDidMount: function(){
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', this.fillInAddress);
  },

  fillInAddress: function () {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    console.log(place);

    var street_number = "", street = "", city = "", state = "", zip = "", country = "";
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      switch(addressType) {
        case "street_number":
          street_number = place.address_components[i].long_name;
          break;
        case "route":
          street = place.address_components[i].long_name;
          break;
        case "sublocality_level_1":
          city = place.address_components[i].long_name;
          break;
        case "locality":
          city = place.address_components[i].long_name;
          break;
        case "administrative_area_level_1":
          state = place.address_components[i].short_name;
          break;
        case "country":
          country = place.address_components[i].long_name;
          break;
        case "postal_code":
          zip = place.address_components[i].long_name;
          break;
      }
    }

    this.setState({
      address: street_number + " " + street,
      city: city,
      state: state,
      country: country,
      zip: zip
    });
  },

  handleAutoCompleteInputChange: function (event) {
    this.setState({autoCompleteInput: event.target.value});
  },
  handleAddressChange: function (event) {
    this.setState({address: event.target.value});
  },
  handleCityChange: function (event) {
    this.setState({city: event.target.value});
  },
  handleStateChange: function (event) {
    this.setState({state: event.target.value});
  },
  handleZipChange: function (event) {
    this.setState({zip: event.target.value});
  },
  handleCountryChange: function (event) {
    this.setState({country: event.target.value});
  },
  handleAptChange: function (event) {
    this.setState({apt: event.target.value});
  },

  handleSubmit: function () {
    this.setState({saving: true});
    this.render();
    // var formData = new FormData();
    // formData.append("user[name]", this.state.name);
    // formData.append("user[email]", this.state.email);
    // formData.append("user[species]", this.state.species);
    // formData.append("user[location]", this.state.location);
    // formData.append("user[bio]", this.state.bio);
    //
    // if (this.state.imageFile) {
    //   formData.append("user[image]", this.state.imageFile);
    // }
    // ClientActions.updateUser(formData, this.redirectAfterUpdate, this.rerenderIfFail);
  },

  render: function () {
    if (this.state.address === "" &&
        this.state.city === "" &&
        this.state.state === "" &&
        this.state.country === "" &&
        this.state.zip === ""
    ) {
      return(
        <div className="add-listing-container">
          <section className="add-listing">
            <h1>Add a Listing</h1>
            <h2>Where's your place located?</h2>
            <input id="autocomplete" onChange={this.handleAutoCompleteInputChange} value={this.state.autoCompleteInput} placeholder="Enter your address" type="text"></input>
          </section>
        </div>
      );
    } else {

      var saveButtonClass = this.state.saving ? "save-profile-button-disabled" : "save-profile-button";
      var saveButtonText = this.state.saving ? "Saving..." : "Save";

      return(
        <div className="add-listing-container">
          <section className="add-listing">
            <h1>Add a Listing</h1>
            <h2>Where's your place located?</h2>
            <label>
              <h3>Country</h3>
              <input onChange={this.handleCountryChange} value={this.state.country}></input>
            </label><br />
            <label>
              <h3>Street Address</h3>
              <input onChange={this.handleAddressChange} value={this.state.address}></input>
            </label><br />
            <label>
              <h3>Apt, Suite, Bldg. (optional)</h3>
              <input onChange={this.handleAptChange} value={this.state.apt}></input>
            </label><br />
            <label>
              <h3>City</h3>
              <input className="short" onChange={this.handleCityChange} value={this.state.city}></input>
            </label><br />
            <label>
              <h3>State</h3>
              <input className="short" onChange={this.handleStateChange} value={this.state.state}></input>
            </label><br />
            <label>
              <h3>ZIP Code</h3>
              <input className="short" onChange={this.handleZipChange} value={this.state.zip}></input>
            </label><br />
            <button onClick={this.handleSubmit} id={saveButtonClass}>{saveButtonText}</button>
          </section>
        </div>
      );
    }

  }

});

module.exports = AddListing;
