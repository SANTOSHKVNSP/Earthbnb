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
    if current_user
      @user = current_user
    else
      render json: {}
    end
  end

  def update
    if current_user.update(user_params)
      @user = current_user
    else
      render json: current_user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :email, :name, :species, :location, :bio, :image)
  end
end
