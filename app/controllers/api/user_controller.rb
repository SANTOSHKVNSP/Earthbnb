class Api::UserController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login_user!(@user)
      render json: {user: current_user}
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    render json: {user: current_user}
  end

  def update
    if current_user.update(user_params)
      render json: {user: current_user}
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :email, :name, :species, :location, :bio, :image)
  end
end
