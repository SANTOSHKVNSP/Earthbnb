Rails.application.routes.draw do

  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do

    resources :user, only: [:create]
    get 'user' => 'user#show'
    patch 'user' => 'user#update'
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :show]

    resources :properties, only: [:create, :index, :show, :destroy, :update]

    resources :property_types, only: [:index]

    resources :reservations, only: [:create]

  end

end
