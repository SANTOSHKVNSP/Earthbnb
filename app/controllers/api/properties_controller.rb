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
    if (params[:user])
      # render json: Property.where(user_id: params[:user])
      @properties = Property.where(user_id: params[:user])
    else
      render json: Property.all
    end
  end

  def show
    @property = Property.find(params[:id])
  end

  def destroy
    @property = Property.find(params[:id])
    @property.destroy
    render json: @property
  end

  def update
    @property = Property.find(params[:id])
    if @property.update(property_params)
      render json: @property
    else
      render json: @property.errors.full_messages, status: 422
    end
  end

  private

  def property_params
    params.require(:property).permit(
      :user_id, :address, :apt, :city, :state, :zip, :country,
      :lat, :lon, :property_type_id, :bedrooms, :beds, :bathrooms, :accommodates,
      :description, :title, :house_rules, :price, :currency, :image)
  end
end
