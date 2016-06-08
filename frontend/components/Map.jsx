var React = require('react');
var PropertiesStore = require('../stores/PropertiesStore.js');
var ClientActions = require('../actions/ClientActions.js');
// var hashHistory = require('react-router').hashHistory;

var Map = React.createClass({
  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return ({
      markers: []
    });
  },

  clearMarkers: function () {
    this.state.markers.forEach(function (marker) {
      marker.setMap(null);
    });
  },

  handleClick: function (coords) {
    // this.context.router.push({
    //   pathname: "benches/new",
    //   query: coords
    // });
  },

  updateState: function () {
    var marker;
    var properties = PropertiesStore.all();

    this.clearMarkers();

    Object.keys(properties).forEach(function (key) {
      marker = new google.maps.Marker({
        position: {lat: properties[key].lat, lng: properties[key].lon},
        map: this.state.map,
        title: 'Hello World!'
      });
      this.state.markers.push(marker);
    }.bind(this));
  },

  componentDidMount: function () {
    var mapDOMNode = this.refs.map;
    var mapOptions;
    if (this.props.startingLat && this.props.startingLng) {
      mapOptions = {
        center: {lat: this.props.startingLat, lng: this.props.startingLng},
        zoom: 13
      };
    } else {
      mapOptions = {
        center: {lat: 40.7179464, lng: -74.0139052},
        zoom: 13
      };
    }

    this.state.map = new google.maps.Map(mapDOMNode, mapOptions);

    this.state.map.addListener('idle', function() {
      var mapBounds = this.state.map.getBounds();
      var northEast = mapBounds.getNorthEast();
      var southWest = mapBounds.getSouthWest();
      var boundsObject = {
        "bounds": {
          "northEast": {"lat": northEast.lat(), "lng": northEast.lng()},
          "southWest": {"lat": southWest.lat(), "lng": southWest.lng()}
        }
      };
      ClientActions.fetchBoundsProperties(boundsObject);
    }.bind(this));

    // this.state.map.addListener('click', function(event) {
    //   var latitude = event.latLng.lat();
    //   var longitude = event.latLng.lng();
    //   this.handleClick({lat: latitude, lng: longitude});
    // }.bind(this));

    this.listener = PropertiesStore.addListener(this.updateState);
  },

  componentWillReceiveProps: function (nextProps) {
    // console.log("new props!");
    // console.log(this.props.startingLat);
    // console.log(this.props.startingLng);
    // if (nextProps) {
    //   console.log(nextProps.startingLat);
    //   console.log(nextProps.startingLng);
    // }
    this.state.map.setCenter({lat: +nextProps.startingLat, lng: +nextProps.startingLng});
  },

  render: function () {
    return (
      <div id="map" className="map" ref="map">
      </div>
    );
  }
});

module.exports = Map;
