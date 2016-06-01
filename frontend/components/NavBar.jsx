var React = require('react');
var ClientActions = require('../actions/ClientActions.js');

var NavBar = React.createClass({

  // getInitialState: function() {
  //   return({
  //     email: "",
  //     password: "",
  //     name: "",
  //     species: "",
  //     nameErrors: [],
  //     speciesErrors: [],
  //     emailErrors: [],
  //     passwordErrors: []
  //   });
  // },

  componentDidMount: function () {
  },

  componentWillUnmount: function () {
  },

  render: function () {

    return(
      <div className={"nav-bar"}>
        Nav Bar
      </div>
    );
  }
});

module.exports = NavBar;
