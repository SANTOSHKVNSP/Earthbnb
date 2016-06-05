class Api::PropertyTypesController < ApplicationController
  def index
    render json: PropertyType.all
  end
end
