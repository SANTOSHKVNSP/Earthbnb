class AddDefaultFalseToFeatured < ActiveRecord::Migration
  def change
    change_column :properties, :featured, :boolean, default: false
  end
end
