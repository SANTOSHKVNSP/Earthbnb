json.array! @reservations do |reservation|
  json.id reservation.id
  json.check_in reservation.check_in
  json.check_out reservation.check_out
  json.guests reservation.guests
  json.property reservation.property
  json.image_url asset_path(reservation.property.image.url(:index))
end
