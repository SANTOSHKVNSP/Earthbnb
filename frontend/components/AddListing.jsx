var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var UserStore = require('../stores/UserStore.js');
var PropertyTypeStore = require('../stores/PropertyTypeStore.js')

var AddListing = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      saving: false,
      autoCompleteInput: "",
      showingPropertyTypeDropDown: false,
      showingCurrencyDropDown: false,
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      apt: "",
      title: "",
      description: "",
      houseRules: "",
      propertyTypeId: 1,
      beds: 0,
      bedrooms: 0,
      bathrooms: 0,
      accommodates: 0,
      lat: 0,
      lon: 0,
      price: 0,
      currency: "Buckazoids",
      user: null
    });
  },

  componentDidMount: function(){
    this.userListener = UserStore.addListener(this.getUser);

    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});
    // When the user selects an address from the dropdown, populate the form.
    autocomplete.addListener('place_changed', this.fillInAddress);
  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },

  getUser: function () {
    this.setState({user: UserStore.user})
  },

  fillInAddress: function () {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
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
  handlePropertyTypeBoxClick: function(event) {
    if (this.state.showingPropertyTypeDropDown) {
      this.setState({showingPropertyTypeDropDown: false});
    } else {
      this.setState({showingPropertyTypeDropDown: true});
    }
  },
  handleSelect: function(event) {
    this.setState({propertyTypeId: event.target.value});
  },
  handleCurrencyBoxClick: function(event) {
    if (this.state.showingCurrencyDropDown) {
      this.setState({showingCurrencyDropDown: false});
    } else {
      this.setState({showingCurrencyDropDown: true});
    }
  },
  handleCurrencySelect: function(event) {
    this.setState({currency: ["Buckazoids", "Plutonium Shards", "Sheep"][event.target.value]});
  },
  handleTitleChange: function (event) {
    this.setState({title: event.target.value});
  },
  handleDescriptionChange: function (event) {
    this.setState({description: event.target.value});
  },
  handleRulesChange: function (event) {
    this.setState({houseRules: event.target.value});
  },
  handleBedsChange: function (event) {
    this.setState({beds: event.target.value});
  },
  handleBedroomsChange: function (event) {
    this.setState({bedrooms: event.target.value});
  },
  handleBathroomsChange: function (event) {
    this.setState({bathrooms: event.target.value});
  },
  handleAccomodatesChange: function (event) {
    this.setState({accommodates: event.target.value});
  },
  handlePriceChange: function (event) {
    this.setState({price: event.target.value});
  },
  handleCurrencyChange: function (event) {
    this.setState({currency: event.target.value});
  },

  handleSubmit: function () {
    this.setState({saving: true});
    this.render();
    var formData = new FormData();
    formData.append("property[user_id]", this.state.user);
    formData.append("property[address]", this.state.address);
    formData.append("property[apt]", this.state.apt);
    formData.append("property[city]", this.state.city);
    formData.append("property[state]", this.state.state);
    formData.append("property[zip]", this.state.zip);
    formData.append("property[country]", this.state.country);
    formData.append("property[lat]", this.state.lat);
    formData.append("property[lon]", this.state.lon);
    formData.append("property[title]", this.state.title);
    formData.append("property[description]", this.state.description);
    formData.append("property[property_type_id]", this.state.propertyTypeId);
    formData.append("property[house_rules]", this.state.houseRules);
    formData.append("property[beds]", this.state.beds);
    formData.append("property[bedrooms]", this.state.bedrooms);
    formData.append("property[accommodates]", this.state.accommodates);
    formData.append("property[bathrooms]", this.state.bathrooms);
    formData.append("property[price]", this.state.price);
    formData.append("property[currency]", this.state.currency);
    // if (this.state.imageFile) {
    //   formData.append("user[image]", this.state.imageFile);
    // }
    ClientActions.createProperty(formData, this.redirectAfterUpdate, this.rerenderIfFail)
  },

  redirectAfterUpdate: function () {
    ClientActions.clearErrors();
    this.context.router.push("/user/listings");
  },

  rerenderIfFail: function () {
    this.setState({saving: false});
  },

  render: function () {

    var PropertyTypes = PropertyTypeStore.all();

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
      var dropdownClass = this.state.showingPropertyTypeDropDown ? "drop-down-visible" : "drop-down-invisible";
      var currencyDropDownClass = this.state.showingCurrencyDropDown ? "drop-down-visible" : "drop-down-invisible";

      return(
        <div className="add-listing-container">
          <section className="add-listing">
            <h1>Add a Listing</h1>
            <form>
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
            </form>
            <h2>What kind of place are you listing?</h2>
            <form>
              <div id="select-box" className={"no-errors"} onClick={this.handlePropertyTypeBoxClick}>
                {PropertyTypes[this.state.propertyTypeId - 1].description}
                <img src={window.dropDownButtonUrl} />
                <ul id="select-box-dropdown" className={dropdownClass}>
                  {PropertyTypes.map(function (type, index) {
                    return(<li onClick={this.handleSelect} value={index + 1} key={index}>{type.description}</li>)
                  }.bind(this))}
                </ul>
              </div><br />
            </form>
            <h2>How many guests can your place accomodate?</h2>
            <form>
              <label>
                <h3>Bedrooms</h3>
                <input className="short" onChange={this.handleBedroomsChange} value={this.state.bedrooms}></input>
              </label><br />
              <label>
                <h3>Beds</h3>
                <input className="short" onChange={this.handleBedsChange} value={this.state.beds}></input>
              </label><br />
              <label>
                <h3>Bathrooms</h3>
                <input className="short" onChange={this.handleBathroomsChange} value={this.state.bathrooms}></input>
              </label><br />
              <label>
                <h3>Accomodates</h3>
                <input className="short" onChange={this.handleAccomodatesChange} value={this.state.accommodates}></input>
              </label><br />
            </form>
            <h2>What amenities do you offer?</h2>
            <form>
            </form>
            <h2>Add a cover photo</h2>
            <form>
            </form>
            <h2>Add a description</h2>
            <form>
              <textarea onChange={this.handleDescriptionChange} value={this.state.description}></textarea>
              <label>
                <h3>What are the house rules?</h3>
                  <textarea id="rules" onChange={this.handleRulesChange} value={this.state.rules}></textarea>
              </label><br />
            </form>
            <h2>Set your price</h2>
            <form>
              <label>
                <h3>Price</h3>
                <input className="short" onChange={this.handlePriceChange} value={this.state.price}></input>
              </label><br />
              <label>
                <h3>Currency</h3>
                <div id="select-box" className={"no-errors"} onClick={this.handleCurrencyBoxClick}>
                  {this.state.currency}
                  <img src={window.dropDownButtonUrl} />
                  <ul id="select-box-dropdown" className={currencyDropDownClass}>
                    {["Buckazoids", "Plutonium Shards", "Sheep"].map(function (type, index) {
                      return(<li onClick={this.handleCurrencySelect} value={index} key={index}>{type}</li>)
                    }.bind(this))}
                  </ul>
                </div><br />
              </label><br />
            </form>
            <h2>Name your place</h2>
            <form>
              <input onChange={this.handleTitleChange} value={this.state.title}></input>
            </form>
            <button onClick={this.handleSubmit} id={saveButtonClass}>{saveButtonText}</button>
          </section>
        </div>
      );
    }

  }

});

module.exports = AddListing;
