json.array! @properties do |property|
  json.id property.id
  json.title property.title
  json.description property.description
  json.lat property.lat
  json.lon property.lon
  json.price property.price
  json.currency property.currency
  json.image_url asset_path(property.image.url(:index))
  json.full_image_url asset_path(property.image.url(:map))
  json.user property.user
  json.user_image asset_path(property.user.image.url(:show))
end
