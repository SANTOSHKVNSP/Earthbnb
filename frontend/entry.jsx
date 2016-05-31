var React = require('react');
var ReactDOM = require('react-dom');

var ErrorsStore = require('./stores/ErrorsStore.js');

var SignUpForm = require('./components/SignUpForm.jsx');

var App = React.createClass({
  render: function () {
    return(
      <div>
      I'm the app!
      </div>
    );
  }
});

document.addEventListener(
  "DOMContentLoaded",
  function(){
    ReactDOM.render(
      <SignUpForm />,
      document.getElementById("content")
    );
  }
);
