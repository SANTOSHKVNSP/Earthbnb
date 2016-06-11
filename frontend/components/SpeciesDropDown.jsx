var React = require('react');

var species1 = "Martian";
var species2 = "Neptunian";
var species3 = "Alpha Centaurian";
var species4 = "Teapot";
var species5 = "Don't Label Me";

var SpeciesArray = [
  "Martian",
  "Neptunian",
  "Alpha Centaurian",
  "Teapot",
  "Don't Label Me"
]

var SpeciesDropDown = React.createClass({

  getInitialState: function() {
    return({
     showingDropDown: false
    })
  },

  handleSpeciesBoxClick: function(event) {
    if (this.state.showingDropDown) {
      this.setState({showingDropDown: false});
    } else {
      this.setState({showingDropDown: true});
    }
  },

  handleSelect: function(e) {
    this.props.callback(SpeciesArray[e.target.value - 1]);
  },

  render: function () {

    var dropDownClass = this.state.showingDropDown ? "drop-down-visible" : "drop-down-invisible";

    return(
      <div id="select-box" className={this.props.classes} onClick={this.handleSpeciesBoxClick}>
        {this.props.text}
        <img src={window.dropDownButtonUrl} />
        <ul id="select-box-dropdown" className={dropDownClass}>
          {SpeciesArray.map(function(species, index) {
            return(
              <li key={index} onClick={this.handleSelect} value={index + 1}>{species}</li>
            )
          }.bind(this))}
        </ul>
      </div>
    );
  }
})

module.exports = SpeciesDropDown;
