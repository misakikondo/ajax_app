class PostsController < ApplicationController
 
 
 def index
  @posts = Post.all.order(id: "DESC")
 end

 def create
  Post.create(content:params[:content])
  redirect_to action: :index
 end

 def checked
  # クリックした時のアクション
  post = Post.find(params[:id])
  # routeで設定したURLパラメーターから、
  # 既読したメモのidをレコードから取り出した
  if post.checked then
    # もし要素がtrueの状態だったら
    post.update(checked: false)
    # クリックした時に未読にする
  else
    # もし要素がfalseの状態だったら
    post.update(checked: true)
    # クリックした時既読にする
  end
  item = Post.find(params[:id])
  # 更新したレコードを取得し直す
  render json: { post: item }
  # JSON形式のデータとしてchecked.jsに返す
 end

end