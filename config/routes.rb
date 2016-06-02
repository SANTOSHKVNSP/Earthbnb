Rails.application.routes.draw do

  root to: "static_pages#root"

  namespace :api do

    resources :user, only: [:create]
    get 'user' => 'user#show'
    patch 'user' => 'user#update'

    resource :session, only: [:create, :destroy]

    resources :users, only: [:index, :show]

  end

end
