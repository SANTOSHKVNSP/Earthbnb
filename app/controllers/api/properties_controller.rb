class Api::PropertiesController < ApplicationController
  def create
    @property = Property.new(property_params)
    if @property.save
      render json: @property
    else
      render json: @property.errors.full_messages, status: 422
    end
  end

  def index
  end

  def show
  end

  def destroy
  end

  def update
  end

  private

  def property_params
    params.require(:property).permit(
      :user_id, :address, :apt, :city, :state, :zip, :country,
      :lat, :lon, :property_type_id, :bedrooms, :beds, :bathrooms, :accommodates,
      :description, :title, :house_rules, :price, :currency)
  end
end
