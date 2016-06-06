var React = require('react');

var ListingsIndexItem = React.createClass({
  render: function () {
    return(
      <li className="listing-index-item">
        <header>
          {this.props.listing.title}
        </header>
        <form>
          <img className="listing-index-item-pic" src={this.props.listing.image_url} />
        </form>
      </li>
    );
  }
});

module.exports = ListingsIndexItem;
