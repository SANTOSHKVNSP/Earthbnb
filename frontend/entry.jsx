var React = require('react');
var ReactDOM = require('react-dom');

var ErrorsStore = require('./stores/ErrorsStore.js');

var NavBar = require('./components/NavBar.jsx');
var SignUpForm = require('./components/SignUpForm.jsx');
var LogInForm = require('./components/LogInForm.jsx');

var App = React.createClass({
  render: function () {
    return(
      <div>
        <NavBar />
        <SignUpForm />
        <LogInForm />
      </div>
    );
  }
});

document.addEventListener(
  "DOMContentLoaded",
  function(){
    ReactDOM.render(
      <App />,
      document.getElementById("content")
    );
  }
);
