var React = require('react');

var NavBar = require('./NavBar.jsx');

var SlideShow = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  render: function () {
    return(
      <section className="slide-show">
        <NavBar background={"transparent"}/>
      </section>
    );
  }
});

module.exports = SlideShow;
