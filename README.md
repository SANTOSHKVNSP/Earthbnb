# Earthbnb

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.earthbnb.herokuapp.com

## Minimum Viable Product

Earthbnb is a web application inspired by Airbnb, but aimed at aliens instead of humans. It will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for an Airbnb-inspired site: user profiles with property listings, reservations, and reviews
- [x] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](https://github.com/appacademy/sample-project-proposal/blob/master/docs/production_readme.md) -- you'll write this later)

## Product Goals and Priorities

Earthbnb will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Fill out their user profile and upload a photo (MVP)
- [ ] Create, edit, and delete property listings where guests can stay (MVP)
- [ ] Make reservations at other users' properties, and see reservations at their own properties (MVP)
- [ ] Leave reviews about properties where they have stayed (MVP)
- [ ] Leave reviews about users who have stayed at their properties (MVP)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup, User Authentication, User Info (2 days)

**Objective:** Functioning rails project with Authentication and user profile info

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.
- [ ] seed the database with a small amount of user data
- [x] setup React Router
- [ ] public user profile page
- [ ] update API for users (`UsersController`)
- implement each user component, building out the flux loop as needed.
  - [ ] `UserDetail`
  - [ ] `UserPhoto`
  - [ ] `EditUserInfo`
- [ ] add CSS stylings

### Phase 2: Properties (3 days)

**Objective:** Properties can be created, displayed, edited and destroyed

- [ ] create `Property` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for properties (`PropertiesController`)
- [ ] setup the flux loop with skeleton files
- implement each property component, building out the flux loop as needed.
  - [ ] `PropertySearch`
  - [ ] `PropertyFilter`
  - [ ] `PropertyIndex`
  - [ ] `PropertyIndexItem`
  - [ ] `Map`
  - [ ] `PropertyDetail`
  - [ ] `PropertyMainPhoto`
  - [ ] `PropertyInfo`
  - [ ] `AddReservation`
  - [ ] `TheSpaceInfo`
  - [ ] `AmenityIndex`
  - [ ] `AmenityIndexItem`
  - [ ] `MorePropertyInfo`
  - [ ] `PhotoIndex`
  - [ ] `PhotoIndexItem`
  - [ ] `AddPhoto`
- [ ] add CSS stylings

### Phase 3: Reservations (2 days)

**Objective:** Reservations can be created, indexed, and destroyed with the
user interface.

- [ ] create `Reservation` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for reservations (`ReservationsController`)
- [ ] setup the flux loop with skeleton files
- implement each reservation component, building out the flux loop as needed.
  - [ ] `ReservationsIndex`
  - [ ] `ReservationsIndexItem`
  - [ ] `ReservationDetail`
  - [ ] `ReservationInfo`
  - [ ] `HostInfo`
  - [ ] `PropertyPhotos`
- [ ] add CSS stylings

### Phase 4: Reviews (2 days)

**Objective:** Reviews can be created, indexed, and destroyed with the user interface.

- [ ] create `Reviews` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for reservations (`ReservationsController`)
- [ ] setup the flux loop with skeleton files
- implement each reservation component, building out the flux loop as needed.
  - [ ] `ReviewsSelector`
  - [ ] `ReviewType`
  - [ ] `ReviewsToWriteIndex`
  - [ ] `ReviewsToWriteItem`
  - [ ] `PastReviewsIndex`
  - [ ] `PastReviewsItem`
  - [ ] `NewReview`
- [ ] add CSS stylings


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
