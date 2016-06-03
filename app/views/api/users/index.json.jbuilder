json.array! @users do |user|
  json.id user.id
  json.name user.name
  json.species user.species
  json.bio user.bio
  json.location user.location
  json.image_url asset_path(user.image.url)
end
