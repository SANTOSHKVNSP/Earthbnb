# Earthbnb

[Earthbnb][heroku]

[heroku]: http://earthbnb.herokuapp.com

Earthbnb is a full-stack web application inspired by Airbnb, but aimed at aliens instead of humans.  It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.  

![Screenshot](/docs/screenshot-2.jpg)

## Features & Implementation

### Single-Page App

Earthbnb is truly a single-page; all content is delivered on one static page.  The root page listens to a `UserStore` and renders content based on a call to `UserStore.user()`.  Sensitive information is kept out of the frontend of the app by making an API call to `UserController#show`.

```ruby
class Api::UserController < ApplicationController
  def show
    if current_user
      @user = current_user
      # below jbuilder template is then rendered
    else
      render json: {}
    end
  end
 end
  ```

```ruby
  json.user do
    json.id @user.id
    json.email @user.email
    json.session_token @user.session_token
    json.name @user.name
    json.species @user.species
    json.bio @user.bio
    json.location @user.location
    json.image_url asset_path(@user.image.url(:full))
  end
  ```

### Account Creation and Editing

  New users can sign up for an account with an email address and password, or with their Google credentials using OmniAuth. A guest account has also been created for convenience.

  After creating an account, users can edit their location and other personal information, and upload a profile image. This is accomplished using the Paperclip gem by Thoughtbot, which uploads user-submitted images to Amazon Web Services.


### Adding Listings

  After creating an account, users can create listings available to rent. The Google Maps API is used to autocomplete an address as it's entered, returning the full address broken down by locality, state, etc., and also returning the latitude and longitude. The user can then add a description to the listing, specify details (number of bedrooms, bathrooms, etc.), and upload a photo.

  The root page of the site uses the React-Slick photo carousel to display the photos of all the listings in the database.


### Displaying Listings

  After a listing has been added, it can be displayed on the listing search page. The listing search page once again uses the Google Maps API to allow the user to navigate around the world.

  ![Screenshot](/docs/screenshot.jpg)


  A listener is added to the map's idle event:

```javascript
  this.state.map.addListener('idle', function() {
    var mapBounds = this.state.map.getBounds();
    var northEast = mapBounds.getNorthEast();
    var southWest = mapBounds.getSouthWest();
    var boundsObject = {
      "bounds": {
        "northEast": {"lat": northEast.lat(), "lng": northEast.lng()},
        "southWest": {"lat": southWest.lat(), "lng": southWest.lng()}
      }
    };
    ClientActions.fetchBoundsProperties(boundsObject);
  }.bind(this));
  ```

  When the map has been left idle for a moment, a GET request is fired to the database to retrieve all of the listings within the bounds of what the map is currently displaying. A summary of each listing, along with the photo, is displayed on the left side of the screen. Users can then click a listing summary to see more information and book a reservation.


### Reservations

  Users can book a reservation on a listing's show page. Reservations have a check-in date, check-out date, and number of guests. After a reservation is booked, it will appear on a user's "Your Trips" page, accessible from their account's admin area.

  Users who have created listings can see what users have booked reservations at them using the "Your Listings" page, also accessible from the admin area. If a listing is deleted, all reservations at that listing will be deleted as well.


## Future Directions for the Project

  There's more I'd like to do with Earthbnb. Future features are outlined below.

### Reviews

  Leaving reviews about hosts and guests is an important part of Airbnb.  I'd like this to be a feature of Earthbnb as well. I plan to create a new page in the account admin area, "Your Reviews", where users can see reviews they've written and reviews written about them. If they've completed a stay at a listing, they'll be prompted to write a new review (and the host will be prompted to write a review about them).

### Booking Notifications

  I also would like users to be instantly notified if they're online when another user books a reservation at one of their listings. I plan to implement Web Sockets to accomplish this.
