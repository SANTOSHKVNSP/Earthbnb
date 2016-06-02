var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var UserStore = require('../stores/UserStore.js');

var EditProfile = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      name: "",
      email: "",
      species: "",
      bio: "",
      location: ""
    });
  },

  componentDidMount: function () {
    this.listener = UserStore.addListener(this.getUser);
    ClientActions.fetchUser();
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },

  getUser: function () {
    user = UserStore.user();
    this.setState({
      name: user.name,
      email: user.email,
      species: user.species,
      bio: user.bio ? user.bio : "",
      location: user.location ? user.location : "",
      id: user.id
    });
  },

  changeName: function (event) {
    this.setState({name: event.target.value});
  },
  changeEmail: function (event) {
    this.setState({email: event.target.value});
  },
  changeSpecies: function (event) {
    this.setState({species: event.target.value});
  },
  changeLocation: function (event) {
    this.setState({location: event.target.value});
  },
  changeBio: function (event) {
    this.setState({bio: event.target.value});
  },

  handleSubmit: function () {
    var userData = {
      name: this.state.name,
      species: this.state.species,
      email: this.state.email,
      location: this.state.location,
      bio: this.state.bio
    };
    ClientActions.updateUser(userData);
    this.context.router.push("/users/" + this.state.id);
  },

  handleViewProfileClick: function () {
    this.context.router.push("/users/" + this.state.id);
  },

  handleUploadClick: function () {
    console.log("click!");
  },

  render: function () {
    return(
      <div className="edit-profile">
        <header className="edit-profile-header">Required</header>
        <form>
          <label>
            Name<input type="text" onChange={this.changeName} value={this.state.name} />
          </label><br />
          <label>
            Email Address<input type="text" onChange={this.changeEmail} value={this.state.email} />
          </label><br />
          <label>
            I Am A<input type="text" onChange={this.changeSpecies} value={this.state.species} />
          </label>
        </form>

        <header className="edit-profile-header">Optional</header>
        <form>
          <label>
            Where You Live<input type="text" onChange={this.changeLocation} value={this.state.location} />
          </label><br />
          <label>
            Describe Yourself<textarea rows="5" cols="20" onChange={this.changeBio} value={this.state.bio} />
          </label><br />
          <p>Earthbnb is built on relationships. Help other people get to know you.</p>
          <p>Tell them about the things you like: What are 5 things you can’t live without? Share your favorite travel destinations, books, movies, shows, music, food.</p>
          <p>Tell them what it’s like to have you as a guest or host: What’s your style of traveling? Of Airbnb hosting?</p>
          <p>Tell them about you: Do you have a life motto?</p>
        </form>

        <header className="edit-profile-header">Profile Photo</header>
        <form>
          <img className="profile-pic" src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif" />
          <div className="edit-profile-pic-text">
            Clear frontal face photos are an important way for hosts and guests to learn about each other. It’s not much fun to host a landscape! Please upload a photo that clearly shows your face.
            <button onClick={this.handleUploadClick} id="upload-button" className="white-button">Upload a file from<br />your computer</button>
          </div>
        </form>

        <button onClick={this.handleSubmit} id="save-profile-button">Save</button>
        <button onClick={this.handleViewProfileClick} className="white-button" id="view-profile-button">View Profile</button>
      </div>
    );
  }
});

module.exports = EditProfile;
