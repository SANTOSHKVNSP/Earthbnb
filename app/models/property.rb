class Property < ActiveRecord::Base

  has_attached_file :image,
    :styles => {
      :index => "278x185#",
      :show => "950x350#",
      :map => "540x360#"
    },
    default_url: "default_property_:style.png"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to(
    :property_type,
    class_name: "PropertyType",
    foreign_key: :property_type_id,
    primary_key: :id
  )

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :reservations,
    class_name: "Reservation",
    foreign_key: :property_id,
    primary_key: :id,
    dependent: :destroy
  )

  def self.in_bounds(bounds)
    north_east_lat = bounds["northEast"]["lat"].to_f()
    south_west_lat = bounds["southWest"]["lat"].to_f()
    north_east_lng = bounds["northEast"]["lng"].to_f()
    south_west_lng = bounds["southWest"]["lng"].to_f()

    Property.where("lon <= ? AND lon >= ? AND lat <= ? AND lat >= ?", north_east_lng, south_west_lng, north_east_lat, south_west_lat)
  end

  def self.featured
    Property.where(featured: true)
  end

end
