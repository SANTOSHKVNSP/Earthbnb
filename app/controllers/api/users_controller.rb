class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render json: {users: @users}
  end

  def show
  end

end
