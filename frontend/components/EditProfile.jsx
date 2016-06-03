var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var UserStore = require('../stores/UserStore.js');
var ErrorsStore = require('../stores/ErrorsStore.js');

var EditProfile = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return({
      name: "",
      email: "",
      species: "",
      bio: "",
      location: "",
      imageFile: null,
      imageUrl: null,
      saving: false,
      nameErrors: [],
      speciesErrors: [],
      emailErrors: []
    });
  },

  componentDidMount: function () {
    this.listener = UserStore.addListener(this.getUser);
    this.errorsListener = ErrorsStore.addListener(this.getErrors);
    ClientActions.fetchUser();
  },
  componentWillUnmount: function () {
    this.listener.remove();
    this.errorsListener.remove();
  },

  getUser: function () {
    user = UserStore.user();
    if (user) {
      this.setState({
        name: user.name,
        email: user.email,
        species: user.species,
        bio: user.bio ? user.bio : "",
        location: user.location ? user.location : "",
        id: user.id,
        imageUrl: user.image_url
      });
    }
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
  updateFile: function (event) {
    var file = event.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  handleSubmit: function () {
    this.setState({saving: true});
    this.render();
    var formData = new FormData();
    formData.append("user[name]", this.state.name);
    formData.append("user[email]", this.state.email);
    formData.append("user[species]", this.state.species);
    formData.append("user[location]", this.state.location);
    formData.append("user[bio]", this.state.bio);

    if (this.state.imageFile) {
      formData.append("user[image]", this.state.imageFile);
    }
    ClientActions.updateUser(formData, this.redirectAfterUpdate, this.rerenderIfFail);
  },

  redirectAfterUpdate: function () {
    this.context.router.push("/users/" + this.state.id);
  },

  rerenderIfFail: function () {
    this.setState({saving: false});
    window.scroll(0, 0);
  },

  getErrors: function () {
    this.setState({
      nameErrors: ErrorsStore.nameErrors(),
      speciesErrors: ErrorsStore.speciesErrors(),
      emailErrors: ErrorsStore.emailErrors()
    });
  },

  handleViewProfileClick: function () {
    this.context.router.push("/users/" + this.state.id);
  },

  renderNameErrors: function() {
    return this.state.nameErrors.map(function(nameError, index) {
      return(<div key={index} className="error-message-update">{nameError}</div>);
    });
  },
  renderSpeciesErrors: function() {
    return this.state.speciesErrors.map(function(speciesError, index) {
      return(<div key={index} className="error-message-update">{speciesError}</div>);
    });
  },
  renderEmailErrors: function() {
    return this.state.emailErrors.map(function(emailError, index) {
      return(<div key={index} className="error-message-update">{emailError}</div>);
    });
  },

  render: function () {

    var nameClass = this.state.nameErrors.length > 0 ? "errors" : "no-errors";
    var speciesClass = this.state.speciesErrors.length > 0 ? "errors" : "no-errors";
    var emailClass = this.state.emailErrors.length > 0 ? "errors" : "no-errors";

    var saveButtonClass = this.state.saving ? "save-profile-button-disabled" : "save-profile-button";
    var saveButtonText = this.state.saving ? "Saving..." : "Save";

    return(
      <div className="edit-profile">
        <header className="edit-profile-header">Required</header>
        <form>
          {this.renderNameErrors()}
          <label>
            Name<input type="text" className={nameClass} onChange={this.changeName} value={this.state.name} />
          </label><br />

          {this.renderEmailErrors()}
          <label>
            Email Address<input type="text" className={emailClass} onChange={this.changeEmail} value={this.state.email} />
          </label><br />

          {this.renderSpeciesErrors()}
          <label>
            I Am A<input type="text" className={speciesClass} onChange={this.changeSpecies} value={this.state.species} />
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
          <img className="profile-pic" src={this.state.imageUrl} />
          <div className="edit-profile-pic-text">
            Clear frontal face photos are an important way for hosts and guests to learn about each other. It’s not much fun to host a landscape! Please upload a photo that clearly shows your face.
            <div id="upload-button-container"><input type="file" onChange={this.updateFile} /><div id="upload-button">Upload a file from<br />your computer</div></div>
          </div>
        </form>

        <button onClick={this.handleSubmit} id={saveButtonClass}>{saveButtonText}</button>
        <button onClick={this.handleViewProfileClick} className="white-button" id="view-profile-button">View Profile</button>
      </div>
    );
  }
});

module.exports = EditProfile;
