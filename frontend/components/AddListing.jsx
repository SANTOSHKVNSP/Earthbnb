var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var UserStore = require('../stores/UserStore.js');
var PropertyTypeStore = require('../stores/PropertyTypeStore.js');
var PropertiesStore = require('../stores/PropertiesStore.js');

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
      accommodates: 1,
      lat: 0,
      lon: 0,
      price: 0,
      currency: "Buckazoids",
      user_id: null,
      imageFile: null,
      imageUrl: null,
    });
  },

  componentDidMount: function(){
    this.userListener = UserStore.addListener(this.getUser);
    ClientActions.fetchUser();

    if (this.props.params.listingId) {
      this.propertyListener = PropertiesStore.addListener(this.getProperty);
      ClientActions.fetchProperty(this.props.params.listingId);
    } else {
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
          {types: ['geocode']});
      // When the user selects an address from the dropdown, populate the form.
      autocomplete.addListener('place_changed', this.fillInAddress);
    }
  },
  componentWillUnmount: function () {
    this.userListener.remove();
    this.propertyListener ? this.propertyListener.remove() : true
  },

  getUser: function () {
    user = UserStore.user();
    if (user) {
      this.setState({user_id: user.id});
    }
  },
  getProperty: function () {
    prop = PropertiesStore.only();
    this.setState({
      address: prop.address,
      city: prop.city,
      state: prop.state,
      country: prop.country,
      zip: prop.zip,
      lat: prop.lat,
      lon: prop.lon,
      beds: prop.beds,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      accommodates: prop.accommodates,
      title: prop.title,
      description: prop.description,
      propertyTypeId: prop.property_type.id,
      price: prop.price,
      currency: prop.currency,
      houseRules: prop.house_rules,
      apt: prop.apt,
      imageUrl: prop.index_image_url,
    });
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
      zip: zip,
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng()
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
  addBed: function () {
    this.setState({beds: this.state.beds + 1});
  },
  subtractBed: function () {
    if (this.state.beds > 0) {
      this.setState({beds: this.state.beds - 1});
    }
  },
  addBedroom: function () {
    this.setState({bedrooms: this.state.bedrooms + 1});
  },
  subtractBedroom: function () {
    if (this.state.bedrooms > 0) {
      this.setState({bedrooms: this.state.bedrooms - 1});
    }
  },
  addBathroom: function () {
    this.setState({bathrooms: this.state.bathrooms + 1});
  },
  subtractBathroom: function () {
    if (this.state.bathrooms > 0) {
      this.setState({bathrooms: this.state.bathrooms - 1});
    }
  },
  addAccomodates: function () {
    this.setState({accommodates: this.state.accommodates + 1});
  },
  subtractAccomodates: function () {
    if (this.state.accommodates > 1) {
      this.setState({accommodates: this.state.accommodates - 1});
    }
  },
  handlePriceChange: function (event) {
    this.setState({price: event.target.value});
  },
  handleCurrencyChange: function (event) {
    this.setState({currency: event.target.value});
  },

  updateFile: function (event) {
    var file = event.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  handleSubmit: function () {
    this.setState({saving: true});
    this.render();
    var formData = new FormData();
    formData.append("property[user_id]", this.state.user_id);
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
    if (this.state.imageFile) {
      formData.append("property[image]", this.state.imageFile);
    }
    if (this.props.params.listingId) {
      ClientActions.updateProperty(this.props.params.listingId, formData, this.redirectAfterUpdate, this.rerenderIfFail);
    } else {
      ClientActions.createProperty(formData, this.redirectAfterUpdate, this.rerenderIfFail);
    }
  },

  redirectAfterUpdate: function () {
    ClientActions.clearErrors();
    this.context.router.push("/user/listings");
  },

  rerenderIfFail: function () {
    this.setState({saving: false});
  },

  renderPropertyTypeDropdown: function () {
    var PropertyTypes = PropertyTypeStore.all();
    var dropdownClass = this.state.showingPropertyTypeDropDown ? "drop-down-visible" : "drop-down-invisible";
    if (PropertyTypes.length > 0) {
      return (
        <form>
          <div id="select-box" className={"no-errors"} onClick={this.handlePropertyTypeBoxClick}>
            {PropertyTypes[this.state.propertyTypeId - 1].description}
            <img src={window.dropDownButtonUrl} />
            <ul id="select-box-dropdown" className={dropdownClass}>
              {PropertyTypes.map(function (type, index) {
                return(<li onClick={this.handleSelect} value={type.id} key={index}>{type.description}</li>);
              }.bind(this))}
            </ul>
          </div><br />
        </form>
      );
    }
  },

  renderPageTitle: function () {
    if (this.props.params.listingId) {
      return(
        <h1>Edit Listing</h1>
      );
    } else {
      return(
        <h1>Add a Listing</h1>
      );
    }
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
            <h2>{"Where's your place located?"}</h2>
            <input id="autocomplete" onChange={this.handleAutoCompleteInputChange} value={this.state.autoCompleteInput} placeholder="Enter your address" type="text"></input>
          </section>
        </div>
      );
    } else {

      var saveButtonClass = this.state.saving ? "save-profile-button-disabled" : "save-profile-button";
      var saveButtonText = this.state.saving ? "Saving..." : "Save";
      var currencyDropDownClass = this.state.showingCurrencyDropDown ? "drop-down-visible" : "drop-down-invisible";
      var coverPhoto = this.state.imageUrl ? this.state.imageUrl : window.placeholderImage;

      return(
        <div className="add-listing-container">
          <section className="add-listing">
            {this.renderPageTitle()}
            <form>
              <h2>{"Where's your place located?"}</h2>
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
            {this.renderPropertyTypeDropdown()}
            <h2>How many guests can your place accommodate?</h2>
            <form>
              <label>
                <h3>Bedrooms</h3>
                <div className="increment-box">{this.state.bedrooms}
                  <div onClick={this.subtractBedroom} className="increment-icon minus"></div>
                  <div onClick={this.addBedroom} className="increment-icon plus"></div>
                </div>
              </label><br />
              <label>
                <h3>Beds</h3>
                <div className="increment-box">{this.state.beds}
                  <div onClick={this.subtractBed} className="increment-icon minus"></div>
                  <div onClick={this.addBed} className="increment-icon plus"></div>
                </div>
              </label><br />
              <label>
                <h3>Bathrooms</h3>
                <div className="increment-box">{this.state.bathrooms}
                  <div onClick={this.subtractBathroom} className="increment-icon minus"></div>
                  <div onClick={this.addBathroom} className="increment-icon plus"></div>
                </div>
              </label><br />
              <label>
                <h3>Accomodates</h3>
                <div className="increment-box">{this.state.accommodates}
                  <div onClick={this.subtractAccomodates} className="increment-icon minus"></div>
                  <div onClick={this.addAccomodates} className="increment-icon plus"></div>
                </div>
              </label><br />
            </form>
            <h2>Add a cover photo</h2>
            <form>
              <img className="property-cover-pic" src={coverPhoto} />
              <div id="upload-button-container"><input type="file" onChange={this.updateFile} /><div id="upload-button">Upload a file from<br />your computer</div></div>
            </form>
            <h2>Add a description</h2>
            <form>
              <textarea onChange={this.handleDescriptionChange} value={this.state.description}></textarea>
              <label>
                <h3>What are the house rules?</h3>
                  <textarea id="rules" onChange={this.handleRulesChange} value={this.state.houseRules}></textarea>
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
                      return(<li onClick={this.handleCurrencySelect} value={index} key={index}>{type}</li>);
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
