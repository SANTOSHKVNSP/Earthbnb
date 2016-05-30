# Phase 3: Reservations

## Rails
### Models
* Reservation

### Controllers
* Api::ReservationController (create, destroy, index, show, update)

### Views

## Flux
### Views (React Components)
* ReservationsIndex
  - ReservationsIndexItem
* ReservationDetail
  - ReservationInfo
  - HostInfo
  - PropertyPhotos

### Stores
* Reservations

### Actions
* ApiActions.receiveAllReservations
* ApiActions.receiveSingleReservation
* ApiActions.deleteReservation
* ReservationActions.fetchAllReservations
* ReservationActions.fetchSingleReservation
* ReservationActions.createReservation
* ReservationActions.destroyReservation

### ApiUtil
* ApiUtil.fetchAllReservations
* ApiUtil.fetchSingleReservation
* ApiUtil.createReservation
* ApiUtil.destroyReservation

## Gems/Libraries
