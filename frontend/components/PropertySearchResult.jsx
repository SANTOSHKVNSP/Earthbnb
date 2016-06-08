var React = require('react');

var PropertySearchResult = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  gotoProperty: function () {
    this.context.router.push("/listings/" + this.props.property.id);
  },

  render: function () {
    return (
      <li className="search-result">
        <img onClick={this.gotoProperty} src={this.props.property.full_image_url} />
        <div className="search-result-info">
          <span onClick={this.gotoProperty}>{this.props.property.title}</span>
        </div>
      </li>
    );
  }
});

module.exports = PropertySearchResult;
