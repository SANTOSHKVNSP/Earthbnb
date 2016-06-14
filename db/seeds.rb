# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Property.destroy_all

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
  location: 'Al Haram, Giza Governorate, Egypt',
  bio: "I’m a trillionaire. But the celestial courts sentenced me to renting out my space as a punishment for manslaughter. Harsh sentence, really."
)
belushi.image = File.open(Dir.pwd + "/app/assets/images/seed_images/belushi.jpg")
belushi.save!

belushiSpot = Property.create(
  user_id: belushi.id,
  property_type_id: 5,
  title: "Pyramids of Giza",
  lat: 29.9792,
  lon: 31.1342,
  country: "Egypt",
  address: "address",
  city: "Al Haram",
  state: "Giza Governorate",
  zip: "zip",
  apt: "apt",
  accommodates: 18,
  bedrooms: 10,
  bathrooms: 4,
  beds: 16,
  house_rules: "",
  price: 75,
  currency: 'Buckazoids',
  featured: true,
  description: "I live in a place that my great-great-great grandmothers built. It’s lovely. Fully furnished with crypt-beds and serious sand guards. Pyramid shape allows for maximum space with good cooling system. Long stairway makes for excellent exercise place. Swimming river nearby. Sometimes human babies float in it. Breakfast!"
)
belushiSpot.image = File.open(Dir.pwd + "/app/assets/images/seed_images/belushi_property.jpg")
belushiSpot.save!

beldar = User.create(
  name: 'Beldar',
  species: 'Conehead',
  email: 'beldar@belushi.com',
  password: 'password',
  location: 'Paramus, New Jersey, United States',
  bio: "Greetings! I am Beldar from Remulak. Our rescue ship is due to arrive on this planet in seven Zurls. In the meantime, my wife and I wish to aggrandize our financial standing by sharing our human abode with fellow extraterrestrials. This will please the Highmaster."
)
beldar.image = File.open(Dir.pwd + "/app/assets/images/seed_images/beldar.jpg")
beldar.save!

beldarSpot = Property.create(
  user_id: beldar.id,
  property_type_id: 2,
  title: "Unassuming Human Dwelling",
  lat: 40.944543,
  lon: -74.075419,
  country: "United States",
  address: "address",
  city: "Paramus",
  state: "New Jersey",
  zip: "zip",
  apt: "apt",
  accommodates: 6,
  bedrooms: 3,
  bathrooms: 2,
  beds: 3,
  house_rules: "Please be mindful of how skillfully we have fooled humans into believing we are of their kind. Refrain from any activity that could be perceived as not common or ordinary.",
  price: 25,
  currency: 'Buckazoids',
  featured: true,
  description: "We have a common and ordinary colonial house in Paramus, New Jersey. We have a normal kitchen, bedroom, living room, and bathrooms. It is all basic and commonplace. We have 3 bedrooms for those who require sleep. And a kitchen with an island, much like an island of the mind, but for food. Near good schools, parks, and dentist."
)
beldarSpot.image = File.open(Dir.pwd + "/app/assets/images/seed_images/beldar_property.jpg")
beldarSpot.save!

frank = User.create(
  name: 'Frank',
  species: "Don't Label Me",
  email: 'frank@belushi.com',
  password: 'password',
  location: 'Water Oakley, Windsor, United Kingdom',
  bio: "How do you do? I enjoy hosting travelers in need. Everything I own is leather, and I own a LOT of things. But don't get strung out by the way I look. I have levels. I sing more than I speak and I dance more than I walk. I'd love to show you my latest work. I await your arrival with much antici..."
)
frank.image = File.open(Dir.pwd + "/app/assets/images/seed_images/frank.jpg")
frank.save!

frankSpot = Property.create(
  user_id: frank.id,
  property_type_id: 3,
  title: "Oakley Court",
  lat: 51.4901,
  lon: 0.6724,
  country: "United Kingdom",
  address: "address",
  city: "Water Oakley",
  state: "Windsor",
  zip: "zip",
  apt: "apt",
  accommodates: 52,
  bedrooms: 46,
  bathrooms: 12,
  beds: 52,
  house_rules: "Underground laboratory is strictly off limits before dark.",
  price: 80,
  currency: 'Buckazoids',
  featured: true,
  description: "My guests say my mansion is like stepping back in time. There are plenty of handrails to slide down, as well as lots of banquet halls, state rooms, red drapery, and slaves good for relieving my tension. Remnants of my past mental relationships sometimes drop by unannounced."
)
frankSpot.image = File.open(Dir.pwd + "/app/assets/images/seed_images/frank_property.jpg")
frankSpot.save!

martha = User.create(
  name: 'Martha',
  species: "Martian",
  email: 'martha@belushi.com',
  password: 'password',
  location: 'Westport, Connecticut',
  bio: "You probably know me as the most successful case of an extraterrestrial being to conquer Earth. I’ve been here for 63 years and not one human has ever figured out that I come from Neptune. I make 8-course meals for all my guests, along with a monogrammed pillowcase and matching towel set. That is, unless I'm in a fancy human jail, in which case I'll access my properties telepathically and have my robots do it."
)
martha.image = File.open(Dir.pwd + "/app/assets/images/seed_images/martha.jpg")
martha.save!

marthaSpot = Property.create(
  user_id: martha.id,
  property_type_id: 4,
  title: "Turkey Hill Farm",
  lat: 41.137705,
  lon: -73.320954,
  country: "United States",
  address: "address",
  city: "Westport",
  state: "Connecticut",
  zip: "zip",
  apt: "apt",
  accommodates: 12,
  bedrooms: 8,
  bathrooms: 4,
  beds: 12,
  house_rules: "No shoes on the carpet. Please wash all scalpels thoroughly after using.",
  price: 200,
  currency: 'Buckazoids',
  featured: true,
  description: "This is a beautiful pre-war home with all stainless steel appliances. Lots of natural light and a fully-stocked pantry and craft closet. I supplied the torture chamber with local instruments from planets across the galaxy so no matter where you're from, you'll feel right at home!"
)
marthaSpot.image = File.open(Dir.pwd + "/app/assets/images/seed_images/martha_property.jpg")
marthaSpot.save!

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
  location: 'New York, New York, United States',
  bio: "I can't die. It's really annoying. My apartment is filled with thousands of books and I've read each one three times. My friends suggested I become an Earthbnb host to keep myself occupied, so here I am. I also enjoy horseback riding. Sometimes I eat the horse after I'm done."
)
grizzmorta.image = File.open(Dir.pwd + "/app/assets/images/seed_images/grizzamorta.jpg")
grizzmorta.save!

grizzamorta_spot = Property.create(
  user_id: grizzmorta.id,
  property_type_id: 1,
  title: "Spacious SoHo Apartment",
  lat: 40.723022,
  lon: -73.995000,
  country: "United States",
  address: "address",
  city: "New York",
  state: "New York",
  zip: "zip",
  apt: "apt",
  accommodates: 3,
  bedrooms: 3,
  bathrooms: 2,
  beds: 3,
  house_rules: "Do whatever you want. Just make it interesting.",
  price: 25,
  currency: 'Plutonium Shards',
  featured: true,
  description: "Luxurious SoHo apartment. I built all the furniture myself from imported materials. Occasionally the boredom of immortality overwhelmes me and I set everything on fire so I can start over. That only happened once when a guest was staying here though, so you'll probably be fine."
)
grizzamorta_spot.image = File.open(Dir.pwd + "/app/assets/images/seed_images/grizzamorta_property.jpg")
grizzamorta_spot.save!

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

yonterSpot = Property.create(
  user_id: yonter.id,
  property_type_id: 3,
  title: "Yonter's Party Palace",
  lat: 36.169941,
  lon: -115.13983,
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
  featured: true,
  description: "We’ve got everything here. 45 bedrooms (but who needs sleep!?), 10 dance floors, a bowling alley, three swimming pools, four tattoo parlors, drinking rooms, screaming rooms, music rooms, eating rooms, jumping rooms, deep conversation rooms, and 15 more dance floors that become swimming pools."
)
yonterSpot.image = File.open(Dir.pwd + "/app/assets/images/seed_images/yonter_property.jpg")
yonterSpot.save!

#only the first time!
PropertyType.create([
  { description: 'Apartment' },
  { description: 'House' },
  { description: 'Mansion' },
  { description: 'Subterranean Fortress' },
  { description: 'Pyramid' },
  { description: 'Dyson sphere' },
])
