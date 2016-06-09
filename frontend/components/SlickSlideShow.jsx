var React = require('react');
var Slider = require('react-slick');
var ClientActions = require('../actions/ClientActions.js');
var PropertiesStore = require('../stores/PropertiesStore.js');

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

  getProperties: function () {
    this.setState({
      properties: PropertiesStore.all()
    });
  },

  render: function() {
    console.log(this.state.properties);
  	var settings = {
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false
    };
    return (
    	<div className='slick-container'>
      	<Slider className='slick-container' {...settings}>
          {this.state.properties.map(function (property, index) {
            return(
              <img key={index} src={property.image_url} />
            );
          })}
        </Slider>
      </div>
    );
  }
});

module.exports = SlickSlideShow;
