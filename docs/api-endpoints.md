# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Users

- `GET /api/users/:id`

### Species

- `GET /api/species/:id`

### Properties

- `GET /api/properties`
  - accepts `lat` and `long` query params
  - accepts `user_id` query param
- `POST /api/properties`
- `GET /api/properties/:id`
- `PATCH /api/properties/:id`
- `DELETE /api/properties/:id`

### Property-Type

- `GET /api/property-types/:id`

### Room-Type

- `GET /api/room-types/:id`

### Amenity_Taggings

- A property's amenities will be included in the property show template
- `GET /api/amenity_taggings`
  - accepts `property_id` query param
- `POST /api/amenity_taggings/:id`
- `DELETE /api/amenity_taggings/:id`

### Photos

- `GET /api/photos`
  - accepts `user_id` query param
  - accepts `property_id` query param
- `POST /api/photos`
- `DELETE /api/photos/:id`

### Reservations

- `GET /api/reservations`
  - accepts `user_id` query param
  - accepts `property_id` query param
- `POST /api/reservations`
- `GET /api/reservations/:id`
- `DELETE /api/properties/:id`

### Reviews

- `GET /api/reviews`
  - accepts `user_id` query param
  - accepts `property_id` query param
  - accepts `reservation_id` query param
- `POST /api/reviews`
- `GET /api/reviews/:id`
- `DELETE /api/reviews/:id`
