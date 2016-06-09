var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var PropertiesStore = require('../stores/PropertiesStore.js');
var UserStore = require('../stores/UserStore.js');
var ErrorsStore = require('../stores/ErrorsStore.js');

var ShowProperty = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      title: "",
      description: "",
      houseRules: "",
      currency: "",
      price: 0,
      property_type: "",
      imageUrl: "",
      userImageUrl: "",
      lat: 0,
      lon: 0,
      userName: "",
      userId: null,
      beds: 0,
      accommodates: 0,
      bathrooms: 0,
      bedrooms: 0,
      checkInErrors: [],
      checkOutErrors: []
    });
  },

  componentDidMount: function () {
    this.propertiesListener = PropertiesStore.addListener(this.getProperty);
    this.errorsListener = ErrorsStore.addListener(this.getErrors);
    ClientActions.fetchProperty(this.props.params.listingId);
  },

  componentWillReceiveProps: function (newProps) {
    console.log("new props");
    ClientActions.fetchProperty(newProps.params.listingId);
  },

  componentWillUnmount: function () {
    this.propertiesListener.remove();
    this.errorsListener.remove();
  },

  getProperty: function () {
    var prop = PropertiesStore.find(1);
    this.setState({
      address: prop.address,
      apt: prop.apt,
      city: prop.city,
      state: prop.state,
      zip: prop.zip,
      country: prop.country,
      title: prop.title,
      description: prop.description,
      houseRules: prop.house_rules,
      currency: prop.currency,
      price: prop.price,
      property_type: prop.property_type,
      imageUrl: prop.image_url,
      userImageUrl: prop.user_image_url,
      lat: prop.lat,
      lon: prop.lon,
      userName: prop.user.name,
      userId: prop.user.id,
      beds: prop.beds,
      accommodates: prop.accommodates,
      bathrooms: prop.bathrooms,
      bedrooms: prop.bedrooms,
      check_in: undefined,
      check_out: undefined,
      guests: 1,
      booking: false
    });
  },

  redirectToUser: function () {
    this.context.router.push("/users/" + this.state.userId);
  },

  handleCheckIn: function (event) {
    this.setState({
      check_in: event.target.value
    });
  },
  handleCheckOut: function (event) {
    this.setState({
      check_out: event.target.value
    });
  },
  handleGuestsChange: function (event) {
    this.setState({
      guests: event.target.value
    });
  },
  handleBook: function () {
    if (this.state.check_in === undefined) {
      document.getElementById("check-in-input").focus();
    } else if(this.state.check_out === undefined) {
      document.getElementById("check-out-input").focus();
    } else {
      this.setState({booking: true});
      ClientActions.createReservation({
        user_id: UserStore.user().id,
        property_id: this.props.params.listingId,
        check_in: this.state.check_in,
        check_out: this.state.check_out,
        guests: this.state.guests
      }, this.reDirectToTrips, this.renderErrors);
    }
  },
  reDirectToTrips: function () {
    console.log("go to trips page!");
  },
  renderErrors: function () {
    this.setState({booking: false});
  },

  getErrors: function () {
    this.setState({
      checkInErrors: ErrorsStore.checkInErrors(),
      checkOutErrors: ErrorsStore.checkOutErrors()
    });
  },

  renderCheckInErrors: function() {
    return this.state.checkInErrors.map(function(checkInError, index) {
      return(<div key={index} className="error-message-book">{checkInError}</div>);
    });
  },
  renderCheckOutErrors: function() {
    return this.state.checkOutErrors.map(function(checkOutError, index) {
      return(<div key={index} className="error-message-book">{checkOutError}</div>);
    });
  },

  renderBookDiv: function () {

    if (UserStore.user()) {
      var guestsArray = [];
      for ( i = 1; i <= this.state.accommodates; i++ ) {
        guestsArray.push(i);
      }

      var checkInClass = this.state.checkInErrors.length > 0 ? "errors" : "no-errors";
      var checkOutClass = this.state.checkOutErrors.length > 0 ? "errors" : "no-errors";
      var addBookingButtonClass = this.state.booking ? "booking-button-waiting" : "booking-button-not-waiting";

      return(
        <div className="book">
          <header>{this.state.price} {this.state.currency} Per Night</header>
          <div className="book-body">
            {this.renderCheckInErrors()}
            {this.renderCheckOutErrors()}
            Check in <input id="check-in-input" className={checkInClass} onChange={this.handleCheckIn} type="date" disabled={this.state.booking} /><br />
            Check out <input id="check-out-input" className={checkOutClass} onChange={this.handleCheckOut} type="date" disabled={this.state.booking} /><br />
            Guests
            <select onChange={this.handleGuestsChange} defaultValue={1} disabled={this.state.booking}>
              {guestsArray.map(function (num) {
                return(
                  <option key={num} value={num}>{num}</option>
                );
              })}
            </select>
            <button className={addBookingButtonClass} onClick={this.handleBook}>Book</button>
          </div>
        </div>
      );
    }
  },

  render: function () {

    return(
      <div className="show-property">
        <img className="show-property-image" src={this.state.imageUrl} />
        <section className="show-property-header">
          <div className="show-property-header-column group">
            <div className="show-property-header-image-div">
              <img onClick={this.redirectToUser} src={this.state.userImageUrl} /><br />
              <span onClick={this.redirectToUser}>{this.state.userName}</span>
            </div>
            <div className="show-property-header-text-div">
              <header>{this.state.title}</header>
              {this.state.city}, {this.state.state}, {this.state.country}
            </div>
            {this.renderBookDiv()}
          </div>
        </section>
        <section className="show-property-column">
          <header>About this listing</header>
          {this.state.description}
          <ul>
            <li className="group">
              <div className="column-header">
                The Space
              </div>
              <div className="column-content">
                Property type: <strong>{this.state.property_type.description}</strong><br />
                Accommodates: <strong>{this.state.accommodates}</strong><br />
                Bedrooms: <strong>{this.state.bedrooms}</strong><br />
                Beds: <strong>{this.state.beds}</strong><br />
                Bathrooms: <strong>{this.state.bathrooms}</strong><br />
              </div>
            </li>
            <li className="group">
              <div className="column-header">
                Pricing
              </div>
              <div className="column-content">
                <strong>{this.state.price} {this.state.currency} Per Night</strong>
              </div>
            </li>
            <li className="group">
              <div className="column-header">
                House Rules
              </div>
              <div className="column-content">
                {this.state.houseRules}
              </div>
            </li>
          </ul>
        </section>
      </div>
    );
  }
});

module.exports = ShowProperty;
