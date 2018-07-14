Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: 'json' } do
    get ':commentedItemType/:commentedItemId/comments', to: 'comments#parent_comments', as: 'parent_comments'
    resources :users
    resource :session, only: [:show, :create, :destroy]
    resources :posts, except: [:new]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
