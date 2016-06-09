var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/Dispatcher.js');

var ReservationsStore = new Store(AppDispatcher);

var _reservations = [];

ReservationsStore.resetReservations = function() {
  _reservations = [];
};

ReservationsStore.removeReservation = function(id) {
  newArray = [];
  _reservations.forEach(function(reservation) {
    if (reservation.id === id) {
    } else {
      newArray.push(reservation);
    }
  });
  _reservations = newArray;
};

ReservationsStore.all = function() {
  return _reservations;
};

ReservationsStore.setReservations = function(reservations) {
  this.resetReservations();
  reservations.forEach(function(reservation) {
    _reservations.push(reservation);
  });
};

ReservationsStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case "RESERVATIONS_RECEIVED":
      this.setReservations(payload.reservations);
      this.__emitChange();
      break;
    case "RESERVATION_REMOVED":
      this.removeReservation(payload.reservation.id);
      this.__emitChange();
      break;
  }
};

module.exports = ReservationsStore;
