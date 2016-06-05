class CreatePropertyTypes < ActiveRecord::Migration
  def change
    create_table :property_types do |t|
      t.string :description, null: false

      t.timestamps null: false
    end
  end
end
