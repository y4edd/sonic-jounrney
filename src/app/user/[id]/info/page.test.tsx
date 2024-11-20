// <ロジック部分のテスト項目>
// 1.loadUser 関数
// 正常なユーザーデータが取得できる場合、userId が正しく設定されること。
// サーバーエラーが発生した場合、serverError にエラーメッセージが設定されること。
// 処理後に loading が false になること。

//2.getUserInfo 関数
// 正常にユーザー情報が取得できた場合、userData にデータが設定されること。
// サーバーエラーが発生した場合、serverError にエラーメッセージが設定されること。
// 処理後に loading が false になること。

//3.choiceDelete 関数
// ボタンがクリックされたとき、退会処理が進行中の場合は再度処理が開始されないこと。
// 正常に退会できた場合、適切なトーストが表示され、リダイレクトされること。
// エラーが発生した場合、serverError にエラーメッセージが設定されること。

//4.handleEdit 関数
// 正しいルート（/user/${userId}/edit）にリダイレクトされること。

//5.handleDelete 関数
// モーダルが正しく展開されること。

//6.cancelDelete 関数
// モーダルが閉じられること。

//7.handleBack 関数
// /mypage に正しくリダイレクトされること。

// <UIのテスト項目>

// 1.初期ロード状態
// loading が true の場合、「Loading...」メッセージが表示されること。
// 2.未認証のアクセス
// userId が null の場合、UnauthorizedAccess コンポーネントが表示されること。
// 3.エラーメッセージ
// serverError が設定された場合、正しいエラーメッセージが表示されること。
// 4.モーダルの動作
// モーダルが展開中の際、DeleteConfirm コンポーネントが正しく表示されること。
// モーダルの「キャンセル」ボタンがクリックされた場合、モーダルが閉じられること。
// 5.ユーザーデータの表示

// userData が設定された場合、ユーザー名、メールアドレス、パスワードが正しく表示されること。
// データが未取得の場合、「Loading...」が表示されること。
// 6.ボタンの動作

// 「編集」ボタンを押すと、handleEdit が呼び出されること。
// 「退会」ボタンを押すと、handleDelete が呼び出されること。
// 「戻る」ボタンを押すと、handleBack が呼び出されること。
