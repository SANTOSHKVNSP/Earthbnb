var React = require('react');

var PropertySearchResult = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  gotoProperty: function () {
    this.context.router.push("/listings/" + this.props.property.id);
  },

  gotoUser: function () {
    this.context.router.push("/users/" + this.props.property.user.id);
  },

  render: function () {
    return (
      <li className="search-result">
        <img className="search-result-property-image" onClick={this.gotoProperty} src={this.props.property.full_image_url} />
        <div className="search-result-info">
          <span onClick={this.gotoProperty}>{this.props.property.title}</span>
        </div>
        <img onClick={this.gotoUser} src={this.props.property.user_image} className="search-result-owner-image" />
        <div onClick={this.gotoProperty} className="price-display">
          {this.props.property.price} {this.props.property.currency} / night
        </div>
      </li>
    );
  }
});

module.exports = PropertySearchResult;
