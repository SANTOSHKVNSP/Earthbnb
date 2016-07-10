class Api::ReservationsController < ApplicationController

  def create
    if Property.find(params["reservation"]["property_id"].to_i).user_id == current_user.id
      render text: "You cannot book your own property", status: 422
    else
      @reservation = Reservation.new(reservation_params)
      if @reservation.save
        Pusher.trigger('host_' + @reservation.property.user.id.to_s, 'reservation_change', {})
        render json: @reservation
      else
        render json: @reservation.errors.full_messages, status: 422
      end
    end
  end

  def index_user
    @reservations = Reservation.where(user_id: params[:user_id]).order(:check_in)
  end

  def destroy
    @reservation = Reservation.find(params[:id])
    @reservation.destroy
    Pusher.trigger('host_' + @reservation.property.user.id.to_s, 'reservation_change', {})
    render json: @reservation
  end


  private

  def reservation_params
    params.require(:reservation).permit(
      :user_id, :property_id, :check_in, :check_out, :guests)
  end
end
