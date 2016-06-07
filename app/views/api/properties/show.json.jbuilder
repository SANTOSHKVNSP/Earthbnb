require 'byebug'

json.property do
  json.user @property.user
  json.title @property.title
  json.description @property.description
  json.house_rules @property.house_rules
  json.property_type @property.property_type
  json.price @property.price
  json.currency @property.currency
  json.lat @property.lat
  json.lon @property.lon
  json.address @property.address
  json.city @property.city
  json.state @property.state
  json.country @property.country
  json.zip @property.zip
  json.apt @property.apt
  json.beds @property.beds
  json.bedrooms @property.bedrooms
  json.bathrooms @property.bathrooms
  json.accommodates @property.accommodates
  json.image_url asset_path(@property.image.url(:show))
  json.index_image_url asset_path(@property.image.url(:index))
  json.user_image_url asset_path(@property.user.image.url(:show))
end
