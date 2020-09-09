Rails.application.routes.draw do
  get 'posts', to: 'posts#index'
  #getでトップページを表示・パスのURLは〜/posts
  #postsコントローラーにいき、indexという名前のアクション

  get 'posts/new', to: 'posts#new'
  post 'posts', to: 'posts#create'

end
