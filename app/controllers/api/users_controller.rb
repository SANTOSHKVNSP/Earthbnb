class Api::UsersController < ApplicationController
  def create
    p "start of create"
    @user = User.new(user_params)
    p "user instantiated"
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
