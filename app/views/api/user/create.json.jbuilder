json.user do
  json.id @user.id
  json.email @user.email
  json.session_token @user.session_token
  json.name @user.name
  json.species @user.species
  json.bio @user.bio
  json.location @user.location
  json.image_url asset_path(@user.image.url)
end
