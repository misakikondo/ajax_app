class PostsController < ApplicationController
 
 
 def index
  @posts = Post.all.order(id: "DESC")
 end

 def create
  Post.create(content:params[:content])
  redirect_to action: :index
 end

 def checked
  post = Post.find(params[:id])
  # routeで設定したURLパラメーターから、
  # 既読したメモのidをレコードから取り出した
  if post.checked 
    post.update(checked: false)
    # 既読だったらfalseに変更する
  else
    post.update(checked: true)
    # 既読でなかったら既読にするためtrueへ変更
  end


  item = Post.find(params[:id])
  # 更新したレコードを取得し直す
  render json: { post: item }
  # JSON形式のデータとしてchecked.jsに返す
 end

end