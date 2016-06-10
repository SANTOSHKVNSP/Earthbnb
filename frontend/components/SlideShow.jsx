var React = require('react');

var SlickSlideShow = require('./SlickSlideShow.jsx');
var NavBar = require('./NavBar.jsx');

var SlideShow = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  render: function () {
    return(
      <section className="slide-show">
        <SlickSlideShow redirectCallback={this.props.redirectCallback} />
        <NavBar background={"transparent"} redirectCallback={this.props.redirectCallback}/>
      </section>
    );
  }
});

module.exports = SlideShow;
