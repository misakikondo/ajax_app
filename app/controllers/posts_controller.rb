class PostsController < ApplicationController
 
 
 def index
  @posts = Post.all.order(id: "DESC")
 end

 def create
  post = Post.create(content: params[:content], checked: false)
  # postを作成保存するためにcreateアクション
  # 中身はフォームからきらパラムスで未読状態で
  render json:{ post: post }
  # json形式でpostをmemo.jsに返す
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
  # JSON形式のデータとしてitemをchecked.jsに返す
 end

end