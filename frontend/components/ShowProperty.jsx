var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var PropertiesStore = require('../stores/PropertiesStore.js');

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
      userName: ""
    });
  },

  componentDidMount: function () {
    this.propertiesListener = PropertiesStore.addListener(this.getProperty);
    ClientActions.fetchProperty(this.props.params.listingId);
  },

  componentWillUnmount: function () {
    this.propertiesListener.remove();
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
      userName: prop.user.name
    });
  },

  render: function () {
    return(
      <div className="show-property">
        <img className="show-property-image" src={this.state.imageUrl} />
        <section className="show-property-header">
          <div className="show-property-header-column group">
            <div className="show-property-header-image-div">
              <img src={this.state.userImageUrl} /><br />
              {this.state.userName}
            </div>
            <div className="show-property-header-text-div"></div>
          </div>
        </section>
        <section className="show-property-column">
          {this.state.title}
        </section>
      </div>
    );
  }
});

module.exports = ShowProperty;
