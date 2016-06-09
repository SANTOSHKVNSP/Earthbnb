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
belushi.image = File.open(Dir.pwd + "/app/assets/images/seed_images/belushi.jpg")
belushi.save!

beldar = User.create(
  name: 'Beldar',
  species: 'Conehead',
  email: 'beldar@belushi.com',
  password: 'password',
  location: 'Paramus, New Jersey',
  bio: "I’m a trillionaire. But the celestial courts sentenced me to renting out my space as a punishment for manslaughter. Harsh sentence, really."
)
beldar.image = File.open(Dir.pwd + "/app/assets/images/seed_images/beldar.jpg")
beldar.save!

frank = User.create(
  name: 'Frank',
  species: "Don't Label Me",
  email: 'frank@belushi.com',
  password: 'password',
  location: 'Overland Park, Kansas',
  bio: "I’m a trillionaire. But the celestial courts sentenced me to renting out my space as a punishment for manslaughter. Harsh sentence, really."
)
frank.image = File.open(Dir.pwd + "/app/assets/images/seed_images/frank.jpg")
frank.save!

martha = User.create(
  name: 'Martha',
  species: "Martian",
  email: 'martha@belushi.com',
  password: 'password',
  location: 'Westport, Connecticut',
  bio: "I’m a trillionaire. But the celestial courts sentenced me to renting out my space as a punishment for manslaughter. Harsh sentence, really."
)
martha.image = File.open(Dir.pwd + "/app/assets/images/seed_images/martha.jpg")
martha.save!

red = User.create(
  name: 'Hunzk',
  species: "Alpha Centaurian",
  email: 'red@belushi.com',
  password: 'password',
  location: 'Portland, Oregon',
  bio: "I’m a trillionaire. But the celestial courts sentenced me to renting out my space as a punishment for manslaughter. Harsh sentence, really."
)
red.image = File.open(Dir.pwd + "/app/assets/images/seed_images/red.jpg")
red.save!

grizzmorta = User.create(
  name: 'Grizzamorta',
  species: "Alpha Centaurian",
  email: 'grizzamorta@belushi.com',
  password: 'password',
  location: 'Milan, Italy',
  bio: "I’m a trillionaire. But the celestial courts sentenced me to renting out my space as a punishment for manslaughter. Harsh sentence, really."
)
grizzmorta.image = File.open(Dir.pwd + "/app/assets/images/seed_images/grizzamorta.jpg")
grizzmorta.save!

obelsk = User.create(
  name: 'Obelsk',
  species: "Alpha Centaurian",
  email: 'obelsk@belushi.com',
  password: 'password',
  location: 'Osnabruck, Germany',
  bio: "I’m a trillionaire. But the celestial courts sentenced me to renting out my space as a punishment for manslaughter. Harsh sentence, really."
)
obelsk.image = File.open(Dir.pwd + "/app/assets/images/seed_images/obelsk.jpg")
obelsk.save!

yonter = User.create(
  name: 'Yonter Von Warpman',
  species: "Alpha Centaurian",
  email: 'yonter@belushi.com',
  password: 'password',
  location: 'Las Vegas, Nevada',
  bio: "What up, EarthBnB-ers! I’m Yonter Von Warpman, the most fun-loving host you’ll ever meet! I was born on Jupiter, but the storms don’t stop there! What a drag. So I moved to Earth and set up shop here in Vegas where I work as a DJ. I spin for some of the hippest parties around. Anyway, I love meeting beings from all over the galaxies. I’m so so so fun and love to talk and dance! I like to really get to know my guests, so make sure you leave time to hang with me in my sweet, sweet pad. If you're dope as hell, I might even let you try out my Amazon Echo."
)
yonter.image = File.open(Dir.pwd + "/app/assets/images/seed_images/yonter.jpg")
yonter.save!

Property.destroy_all

yonterSpot = Property.create(
  user_id: yonter.id,
  property_type_id: 3,
  title: "Yonter's Party Palace",
  lat: 0,
  lon: 0,
  country: "United States",
  address: "address",
  city: "Las Vegas",
  state: "Nevada",
  zip: "zip",
  apt: "apt",
  accommodates: 72,
  bedrooms: 45,
  bathrooms: 17,
  beds: 58,
  house_rules: "No cops. No empty drinks. No shoes in the Jacuzzi.",
  price: 800,
  currency: 'Plutonium Shards',
  description: "We’ve got everything here. 45 bedrooms (but who needs sleep!?), 10 dance floors, a bowling alley, three swimming pools, four tattoo parlors, drinking rooms, screaming rooms, music rooms, eating rooms, jumping rooms, deep conversation rooms, and 15 more dance floors that become swimming pools."
)
yonterSpot.image = File.open(Dir.pwd + "/app/assets/images/seed_images/yonter_property.jpg")
yonterSpot.save!

#only the first time!
PropertyType.create([
  { description: 'Apartment' },
  { description: 'House' },
  { description: 'Palace' },
  { description: 'Subterranean Fortress' },
  { description: 'Pyramid' },
  { description: 'Dyson sphere' },
])
