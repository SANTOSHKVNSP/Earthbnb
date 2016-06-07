class Property < ActiveRecord::Base

  has_attached_file :image, default_url: "property_placeholder_image.png", :styles => {
    :index => "278x185#",
    :show => "950x350#"
  }
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

end
