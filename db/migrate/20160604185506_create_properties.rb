class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.integer :user_id, null: false

      t.string :country, null: false
      t.string :address, null: false
      t.string :apt, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip, null: false

      t.float :lat, null: false
      t.float :lon, null: false

      t.integer :property_type_id, null: false

      t.integer :bedrooms, null: false
      t.integer :beds, null: false
      t.integer :bathrooms, null: false
      t.integer :accommodates, null: false

      t.string :description, null: false
      t.string :title, null: false
      t.string :house_rules, null: false

      t.float :price, null: false
      t.string :currency, null: false

      t.timestamps null: false
    end

    add_index :properties, :user_id
    add_index :properties, :property_type_id
  end
end
