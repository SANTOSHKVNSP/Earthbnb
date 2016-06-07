json.array! @properties do |property|
  json.id property.id
  json.title property.title
  json.description property.description
  json.image_url asset_path(property.image.url(:index))
end
