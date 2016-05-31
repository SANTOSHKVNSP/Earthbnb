class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: {message: "woo!"}
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
  end

  def update
  end

  private

  def user_params
    params.require(:user).permit(:password, :email, :name, :species, :location)
  end
end
