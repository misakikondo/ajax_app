function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    //サーバーへ送信する内容
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }

      // 以下レスポンス
      const item = XHR.response.post;
      // レスポンスとしてのレコードデータを取得
      const list = document.getElementById("list");
      // HTMLを描写する場所を指定する親要素listの要素取得
      const formText = document.getElementById("content");
      // フォーム内をリセットしたいのでフォームのリセットしたい場所の要素取得
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // レスポンスでデータ来た時に更新したいHTMLの部分
      list.insertAdjacentHTML("afterend", HTML);
      //listという要素に追加したいHTML、afterendとしてlistの直後に挿入
      formText.value = "";
      // 入力フォームのcontentを空にする
      // １回のクリックごとにイベントを終了
    };
    e.preventDefault();
  });

}
window.addEventListener("load", memo);