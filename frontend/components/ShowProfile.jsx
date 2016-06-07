var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var UsersStore = require('../stores/UsersStore.js');
var UserStore = require('../stores/UserStore.js');
var PropertiesStore = require('../stores/PropertiesStore.js');
var ListingsIndexItem = require('./ListingsIndexItem.jsx');

var ShowProfile = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      name: "",
      species: "",
      bio: "",
      location: "",
      currentUser: null,
      imageUrl: "",
      properties: []
    });
  },

  componentDidMount: function () {
    this.usersListener = UsersStore.addListener(this.getUser);
    ClientActions.fetchUsers();
    this.userListener = UserStore.addListener(this.getCurrentUser);
    ClientActions.fetchUser();
    this.propertiesListener = PropertiesStore.addListener(this.getProperties);
  },
  componentWillReceiveProps: function () {
    ClientActions.fetchUsers();
  },
  componentWillUnmount: function () {
    this.usersListener.remove();
    this.userListener.remove();
    this.propertiesListener.remove();
  },

  getUser: function () {
    var user = UsersStore.find(this.props.params.userId);
    if (user) {
      this.setState({
        name: user.name,
        bio: user.bio,
        location: user.location,
        species: user.species,
        imageUrl: user.image_url
      }, function () {
        ClientActions.fetchUserProperties(this.props.params.userId);
      });
    }
  },

  getCurrentUser: function () {
    var user = UserStore.user();
    this.setState({currentUser: user});
  },

  getProperties: function () {
    this.setState({properties: PropertiesStore.all()})
  },

  editLink: function () {
    if (this.state.currentUser && this.state.currentUser.id === +this.props.params.userId) {
      return(<span><a onClick={this.handleEditProfileClick}>Edit Profile</a><br /></span>);
    }
  },

  handleEditProfileClick: function () {
    this.context.router.push("/user/edit");
  },

  render: function () {
    return(
      <div className="show-profile">
        <img id="show-profile-image" className="profile-pic" src={this.state.imageUrl}/>
        <article>
          <h1>{"Hey, I'm "}{this.state.name}!</h1>
          <div className="location">{this.state.location}</div>
          {this.editLink()}
          {this.state.bio}
        </article>
        <ul className="listing-index">
          <h6 className="profile-listings-header">My Listings <span className="light">({this.state.properties.length})</span></h6>
          {this.state.properties.map(function (listing, index) {
            return(
              <ListingsIndexItem key={index} listing={listing} />
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = ShowProfile;
