class RemoveLocationConstraint < ActiveRecord::Migration
  def change
    change_column :users, :location, :string, :null => true
  end
end
