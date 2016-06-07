# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all

User.create(
  name: 'Guest',
  species: 'Martian',
  email: 'guest@guest.com',
  password: 'password',
  location: 'New York, New York, United States',
  bio: "I'm just a guest on this site."
)

belushi = User.create(
  name: 'Belushi',
  species: 'Martian',
  email: 'belushi@belushi.com',
  password: 'password',
  location: 'Cairo, Egypt',
  bio: "I’m a trillionaire. But the celestial courts sentenced me to renting out my space as a punishment for manslaughter. Harsh sentence, really."
)

PropertyType.destroy_all

PropertyType.create([
  { description: 'Apartment' },
  { description: 'House' },
  { description: 'Palace' },
  { description: 'Subterranean Fortress' },
  { description: 'Pyramid' },
  { description: 'Dyson sphere' },
])

Property.destroy_all
