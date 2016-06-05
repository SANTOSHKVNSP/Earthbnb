# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(
  name: 'Guest',
  species: 'Martian',
  email: 'guest@guest.com',
  password: 'password',
  location: 'New York, New York, United States',
  bio: "I'm just a guest on this site."
)

PropertyType.create([
  { description: 'Apartment' },
  { description: 'House' },
  { description: 'Palace' },
  { description: 'Subterranean Fortress' },
  { description: 'Pyramid' },
  { description: 'Dyson sphere' },
])
