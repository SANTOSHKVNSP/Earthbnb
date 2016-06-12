var React = require('react');
var Slider = require('react-slick');
var ClientActions = require('../actions/ClientActions.js');
var PropertiesStore = require('../stores/PropertiesStore.js');
var PropertySearchResults = require('../components/PropertySearchResults.jsx');
var PropertySearchResult = require('../components/PropertySearchResult.jsx');
var WhereTo = require('./WhereTo.jsx');

var SlickSlideShow = React.createClass({

  getInitialState: function () {
    return({
      properties: []
    });
  },

  componentDidMount: function () {
    this.listener = PropertiesStore.addListener(this.getProperties);
    ClientActions.fetchPropertyImages();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  getProperties: function () {
    this.setState({
      properties: PropertiesStore.all()
    });
  },

  render: function() {
  	var settings = {
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      draggable: false
    };
    return (
    	<div>
        <div className="top-slideshow-section" >
        	<Slider className='slick-container' {...settings}>
            {this.state.properties.map(function (property, index) {
              return(
                <img key={index} src={property.image_url} />
              );
            })}
          </Slider>
          <div className="live-there">
            <header>
              LIVE THERE
            </header>
            Book homes from local hosts across the planet and experience Earth like a human.
          </div>
          <WhereTo redirectCallback={this.props.redirectCallback}/>
        </div>
        <div className='front-page-column'>
          <h1>Featured Listings</h1>
          <ul className="root-search-results">
            {Object.keys(this.state.properties).map(function (key) {
              return (
                <PropertySearchResult key={key} property={this.state.properties[key]} />
              );
            }.bind(this))}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SlickSlideShow;
