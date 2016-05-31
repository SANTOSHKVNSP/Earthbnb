Rails.application.routes.draw do

  root to: "static_pages#root"

  namespace :api do
    resources :users, only: [:create]
  end

end
