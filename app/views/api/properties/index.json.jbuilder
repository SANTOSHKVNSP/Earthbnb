json.array! @properties do |property|
  json.id property.id
  json.title property.title
  json.description property.description
  json.lat property.lat
  json.lon property.lon
  json.image_url asset_path(property.image.url(:index))
  json.full_image_url asset_path(property.image.url(:map))
end
