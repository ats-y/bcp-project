# 安否登録 Web アプリ

## 開発環境

Visual Studio Code を使用することを前提としています。

### 拡張機能

- Vue Language Features (Volar)
- Prettier - Code formatter

## プロジェクト作成記録

### プロジェクトの新規作成

`npm init vite`のコマンドを実行して、Vue3 プロジェクトを作成します。

```sh
npm init vite@latest bcp-web-app

Need to install the following packages:
  create-vite@latest
Ok to proceed? (y) y
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'create-vite@5.1.0',
npm WARN EBADENGINE   required: { node: '^18.0.0 || >=20.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.14.0', npm: '8.3.1' }
npm WARN EBADENGINE }
✔ Select a framework: › Vue
✔ Select a variant: › JavaScript

caffolding project in bcp-web-app...

Done. Now run:

  cd bcp-web-app
  npm install
  npm run dev
```

### Vuetify の導入

CSS フレームワークとして[Vuetify](https://vuetifyjs.com/en/)を利用します。

```sh
cd bcp-web-app
npm install vuetify@3.4.3
```

### Provide / Inject でログイン状態を管理する。

[Provide / Inject](https://ja.vuejs.org/guide/components/provide-inject) を利用して、アプリケーションレベルでログインユーザ情報を提供・注入します。

### Vue Router の導入

[Vue Router](https://router.vuejs.org/) でルーティング制御を行います。

```sh
npm install vue-router@4
```

### Firebase の導入

#### Firebase プロジェクトの作成

1. Firebase の Web コンソールで、プロジェクトを追加します。
1. 追加したプロジェクトで、ウェブアプリを追加します。

#### 本 Vue プロジェクトへ Firebase SDK を追加

Firebase Web コンソールの`プロジェクトの設定` - `マイアプリ`から[Firebase Web コンソールでの操作](#Firebase プロジェクトの作成)で追加したウェブアプリを選択します。

`SDK の設定と構成`で`npm`を選択し、`SDKの追加`と`SDKの利用開始`を行います。

- SDK の追加

  ```sh
  npm install firebase
  ```

* SDK の利用開始

  `./src/plugins/firebase.js`を追加し、`SDKの利用開始`に記載されているコードを転記します。

  このままだと、`./src/plugins/firebase.js`をソース管理に登録した際に、API キーが外部に公開されてしまいます。これを避けるため、値の実態は環境変数ファイルに定義して、`./src/plugins/firebase.js`では環境変数名で参照するようにします。

  環境変数ファイルは、以下に定義します。

  - `.env`

    環境変数ファイル。  
    Vite を利用しているので、環境変数名の先頭に`VITE_`をつける。

  - `.env.local`

    ローカル環境のみ有効な環境変数ファイル。`.gitignore`に定義されているのでソース管理には登録されない。実際の値はこのファイルに定義する。

  Vite の環境変数についての詳細は[こちらを参照](https://ja.vitejs.dev/guide/env-and-mode.html)。

#### Firestore Database の利用開始

Firebase Web コンソールで、以下を行います。

1. 左側のメニューで`構築`-`Firestore Database`をクリックし、`データベースの作成`をクリックします。

1. `名前とロケーションを設定する`では、任意のロケーションを選択します。

1. `ルールをセキュアにする`では、`テストモードで開始する`を選択します。

本 Vue プロジェクトに Firestore への登録処理を実装します。

- ./src/repositories/SafetyRepository.js
- ./src/repositories/UserRepository.js

#### Authentication の利用開始

Firebase Web コンソールで、以下を行います。

1. 左側のメニューで`構築`-`Authentication`をクリックします。

1. `Sign-in method`タブを選択し、ログイン プロバイダから`メール/パスワード`をクリックします。

1. `メール / パスワード`を`有効にする`に設定し、`保存`ボタンをクリックします。

1. `Users`タブを選択し、`ユーザーを追加`ボタンをクリックします。

1. `メール`と`パスワード`を入力して`ユーザーを追加`ボタンをクリックします。

本 Vue プロジェクトに Firebase への登録処理を実装する。

- ./src/repositories/AuthRepositoryFirebase.js
- ./src/components/pages/LoginComponent.vue
