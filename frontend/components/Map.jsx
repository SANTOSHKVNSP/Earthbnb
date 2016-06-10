var React = require('react');
var PropertiesStore = require('../stores/PropertiesStore.js');
var ClientActions = require('../actions/ClientActions.js');

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

  updateState: function () {
    var marker;
    var properties = PropertiesStore.all();

    this.clearMarkers();

    Object.keys(properties).forEach(function (key) {
      marker = new google.maps.Marker({
        position: {lat: properties[key].lat, lng: properties[key].lon},
        map: this.state.map
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

    this.listener = PropertiesStore.addListener(this.updateState);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  componentWillReceiveProps: function (nextProps) {
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
