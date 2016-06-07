var React = require('react');

var ListingsIndexItem = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  redirect: function () {
    this.context.router.push("/listings/" + this.props.listing.id);
  },

  render: function () {
    return(
      <li onClick={this.redirect} className="listing-index-item">
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
