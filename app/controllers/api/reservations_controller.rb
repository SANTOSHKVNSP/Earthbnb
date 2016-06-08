class Api::ReservationsController < ApplicationController

  def create
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      render json: @reservation
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  # def index
  #   if (params[:user])
  #     @properties = Property.where(user_id: params[:user])
  #   else
  #     # render json: Property.in_bounds(params[:bounds])
  #     @properties = Property.in_bounds(params[:bounds])
  #   end
  # end
  #
  # def show
  #   @property = Property.find(params[:id])
  # end
  #
  # def destroy
  #   @property = Property.find(params[:id])
  #   @property.destroy
  #   render json: @property
  # end
  #
  # def update
  #   @property = Property.find(params[:id])
  #   if @property.update(property_params)
  #     render json: @property
  #   else
  #     render json: @property.errors.full_messages, status: 422
  #   end
  # end

  private

  def reservation_params
    params.require(:reservation).permit(
      :user_id, :property_id, :check_in, :check_out, :guests)
  end
end
