var React = require('react');

var ListingsIndexItem = React.createClass({
  render: function () {
    return(
      <li className="listing-index-item">
        {this.props.listing.title}
      </li>
    );
  }
});

module.exports = ListingsIndexItem;
