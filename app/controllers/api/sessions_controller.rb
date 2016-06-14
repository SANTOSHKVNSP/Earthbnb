class Api::SessionsController < ApplicationController

  def create
    user = User.find_by_email_address(
      params[:user][:email]
    )

    if user.nil?
      render json: {message: "Email does not exist"}, status: 422
    else
      if User.check_password(user, params[:user][:password])
        login_user!(user)
        @user = user
      else
        render json: {message: "Password incorrect"}, status: 422
      end
    end
  end

  def auth_create
    @user = User.find_or_create_by_auth_hash(request.env['omniauth.auth'])

    if @user
      login_user!(@user)
      redirect_to "/"
    else
      render json: {message: "Invalid username/password"}, status: 422
    end
  end

  def destroy
    logout_user!
    render json: {}
  end

end
