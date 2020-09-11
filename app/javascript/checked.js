function check() {
// チェックというファンクション名つけた
  const posts = document.querySelectorAll(".post")
// postクラスのセレクタを全て取得するという定義（定義しただけ！）
  posts.forEach(function(post){
  // postはたくさんあるので、処理を1つずつ行えるような準備
  if (post.getAttribute("data-load") != null) {
    return null;
  }
  post.setAttribute("data-load", "true");
  //よく分からんけど読み込みのタイミングを操作
    post.addEventListener("click", () => {
    // クリックした時に行う処理を{}の中に書く。()=>はfunction()と同じ意味
      const postId = post.getAttribute("data-id");
      // htmlでクリックする要素にカスタムデータを置いたので、定義してる
      // post.getAttribute("data-id")はつまり<%= post.id %>のこと
      // このidは後にサーバーでパラメーターとして送られる
      const XHR = new XMLHttpRequest();
      //XMLHttpRequestに情報を格納して送りたいのでオブジェクト生成する
      XHR.open("GET", `/posts/${postId}`, true);
      //どんなリクエストをするのかopenメソッド
      XHR.responseType = "json";
      //どんなレスポンス形式で返して欲しいかresponseTypeメソッドで指定
      //リクエストと一緒に送る
      XHR.send();
      //リクエストを送るsendメソッド
      XHR.onload = () => {
        //レスポンスの受信が成功したのでonloadでイベントハンドラー
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        //HTTPステータスコードが２００以外ならエラーのポップアップ出す、return nullで処理から抜け出す
        const item = XHR.response.post;
        //XHR.responseでレスポンスされてきたJSONにアクセスできる
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
      
    });
  });

}
setInterval(check, 1000);