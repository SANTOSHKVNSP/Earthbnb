# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.

## Property Cycles

### Property API Request Actions

* `fetchProperties`
  0. 'idle' event listener is added to Google map on `Map` `didMount`
  1. `fetchProperties` is invoked from 'idle' event listener
  2. `GET /api/properties` is called.
  3. `receiveAllProperties` is set as the callback.

* `createProperty`
  1. invoked from add property button `onClick`
  2. `POST /api/properties` is called.
  3. `receiveSingleProperty` is set as the callback.

* `fetchProperty`
  1. invoked from `PropertyDetail` `didMount`
  2. `GET /api/properties/:id` is called.
  3. `receiveSingleProperty` is set as the callback.

* `updateProperty`
  1. invoked from `PropertyDetail` `onSubmit`
  2. `PATCH /api/properties` is called.
  3. `receiveSingleProperty` is set as the callback.

* `destroyProperty`
  1. invoked from delete property button `onClick`
  2. `DELETE /api/properties/:id` is called.
  3. `removeSingleProperty` is set as the callback.

### Property API Response Actions

* `receiveAllProperties`
  1. invoked from an API callback.
  2. `PropertyStore` store updates `_properties` and emits change.

* `receiveSingleProperty`
  1. invoked from an API callback.
  2. `PropertyStore` store updates `_properties[id]` and emits change.

* `removeProperty`
  1. invoked from an API callback.
  2. `Property` store removes `_properties[id]` and emits change.

### Store Listeners

* `PropertySearch` component listens to `PropertyStore` store.
* `PropertyDetail` component listens to `PropertyStore` store.


## User Cycles

### User API Request Actions

* `fetchUser`
  1. invoked from `UserDetail` `didMount`
  2. `GET /api/users/:id` is called.
  3. `receiveSingleUser` is set as the callback.

* `updateUser`
  1. invoked from `PropertyDetail` `onSubmit`
  2. `PATCH /api/properties` is called.
  3. `receiveSingleProperty` is set as the callback.

### User API Response Actions

* `receiveSingleUser`
  1. invoked from an API callback.


## Reservation Cycles

### Reservation API Request Actions

* `fetchAllReservations`
  1. invoked from `ReservationsIndex` `didMount`
  2. `GET /api/reservations` is called.
  3. `receiveAllReservations` is set as the callback.

* `createReservation`
  1. invoked from `AddReservation` `onSubmit`
  2. `POST /api/reservations` is called.
  3. `receiveSingleReservation` is set as the callback.

* `fetchSingleReservation`
  1. invoked from `ReservationDetail` `didMount`
  2. `GET /api/reservations/:id` is called.
  3. `receiveSingleReservation` is set as the callback.

* `destroyReservation`
  1. invoked from delete reservation button `onClick`
  2. `DELETE /api/reservations/:id` is called.
  3. `removeReservation` is set as the callback.

### Reservation API Response Actions

* `receiveAllReservations`
  1. invoked from an API callback.
  2. `ReservationStore` store updates `_reservations` and emits change.

* `receiveSingleReservation`
  1. invoked from an API callback.
  2. `ReservationStore` store updates `_reservations[id]` and emits change.

* `removeReservation`
  1. invoked from an API callback.
  2. `ReservationStore` store removes `_reservations[id]` and emits change.

### Store Listeners

* `AddReservation` component listens to `ReservationStore` store.
* `ReservationsIndex` component listens to `ReservationStore` store.
* `ReservationsDetail` component listens to `ReservationStore` store.


## Review Cycles

### Review API Request Actions

* `fetchAllReviews`
  1. invoked from `ReviewType` `didMount`
  2. `GET /api/reviews` is called.
  3. `receiveAllReviews` is set as the callback.

* `createReview`
  1. invoked from `NewReview` `onSubmit`
  2. `POST /api/reviews` is called.
  3. `receiveSingleReview` is set as the callback.

* `destroyReview`
  1. invoked from delete review button `onClick`
  2. `DELETE /api/reviews/:id` is called.
  3. `removeReview` is set as the callback.

### Reservation API Response Actions

* `receiveAllReviews`
  1. invoked from an API callback.
  2. `ReviewStore` store updates `_reviews` and emits change.

* `receiveSingleReview`
  1. invoked from an API callback.
  2. `ReviewStore` store updates `_reviews[id]` and emits change.

* `removeReview`
  1. invoked from an API callback.
  2. `ReviewStore` store removes `_reviews[id]` and emits change.

### Store Listeners

* `ReviewType` component listens to `ReviewStore` store.
* `PropertyDetail` component listens to `ReviewStore` store.
* `UserDetail` component listens to `ReviewStore` store.
