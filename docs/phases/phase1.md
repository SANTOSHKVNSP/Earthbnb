# Phase 1: User Authentication and JSON API

## Rails
### Models
* User
* Session

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::UsersController (show, update)

### Views
* users/new.html.erb
* session/new.html.erb

## Flux
### Views (React Components)
* UserInfo
* UserDetail
  - UserPhoto
  - EditUserInfo

### Stores

### Actions
* ApiActions.receiveSingleUser
* UserActions.fetchSingleUser
* UserActions.editUser

### ApiUtil
* ApiUtil.fetchSingleUser
* ApiUtil.editUser

## Gems/Libraries
* BCrypt (Gem)
* Flux Dispatcher (npm)
