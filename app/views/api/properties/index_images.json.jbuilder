json.array! @properties do |property|
  json.id property.id
  json.image_url asset_path(property.image.url(:show))
  json.full_image_url asset_path(property.image.url(:map))
  json.title property.title
  json.price property.price
  json.currency property.currency
  json.user property.user
  json.user_image asset_path(property.user.image.url(:show))
end
