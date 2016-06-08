class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :user_id, null: false
      t.integer :property_id, null: false
      t.datetime :check_in, null: false
      t.datetime :check_out, null: false
      t.integer :guests, null: false

      t.timestamps null: false
    end

    add_index :reservations, :user_id
    add_index :reservations, :property_id
  end
end
