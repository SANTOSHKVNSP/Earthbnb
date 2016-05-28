# Schema Information

## amenities
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## properties
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, foreign key (references users), indexed
description      | string    | not null
house rules      | string    | not null
price            | float     | not null
latitude         | float     | not null
longitude        | float     | not null
check_in         | string    | not null
check_out        | string    | not null
bedrooms         | integer   | not null
beds             | integer   | not null
accommodates     | integer   | not null
property_type_id | integer   | not null, foreign key (references property_type), indexed
room_type_id     | integer   | not null, foreign key (references room_type), indexed

## property_type
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
desc        | string    | not null

## room_type
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
desc        | string    | not null

## species
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## amenity_taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
amenity_id  | integer   | not null, foreign key (references amenities), indexed, unique [property_id]
property_id | integer   | not null, foreign key (references properties), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
name            | string    |
bio             | text      |
species_id      | integer   | not null, foreign key (references species), indexed
location        | string    | not null
