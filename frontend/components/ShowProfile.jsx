var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var UsersStore = require('../stores/UsersStore.js');
var UserStore = require('../stores/UserStore.js');

var ShowProfile = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      name: "",
      email: "",
      species: "",
      bio: "",
      location: "",
      currentUser: null,
      imageUrl: ""
    });
  },

  componentDidMount: function () {
    this.usersListener = UsersStore.addListener(this.getUser);
    this.userListener = UserStore.addListener(this.getCurrentUser);
    ClientActions.fetchUsers();
  },
  componentWillReceiveProps: function () {
    ClientActions.fetchUsers();
  },
  componentWillUnmount: function () {
    this.usersListener.remove();
    this.userListener.remove();
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
      });
    }
  },

  getCurrentUser: function () {
    var user = UserStore.user();
    this.setState({currentUser: user});
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
        <img className="profile-pic" src={this.state.imageUrl}/>
        <article>
          <header>
            Hey, I'm {this.state.name}!
          </header>
          <div className="location">{this.state.location}</div>
          {this.editLink()}
          {this.state.bio}
          <div className="filler"></div>
          <div className="filler"></div>
        </article>
      </div>
    );
  }
});

module.exports = ShowProfile;
