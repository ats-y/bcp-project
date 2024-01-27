# 安否登録 Web アプリ

## 開発環境

Visual Studio Code を使用することを前提としています。

### 拡張機能

- Vue Language Features (Volar)
- Prettier - Code formatter

## プロジェクト作成記録

### プロジェクトの新規作成

[こちら](../REAMDME.md)参照。

### Vuetify の導入

CSS フレームワークとして[Vuetify](https://vuetifyjs.com/en/)を利用します。

```sh
cd bcp-web-app
npm install vuetify@3.4.3
```

### Provide / Inject でログイン状態を管理する。

[Provide / Inject](https://ja.vuejs.org/guide/components/provide-inject) を利用して、アプリケーションレベルでログインユーザを提供・注入します。

### Vue Router の導入

[Vue Router](https://router.vuejs.org/) でルーティング制御を行う。

```sh
npm install vue-router@4
```

### Firebase の導入

#### Firebase プロジェクトを作成する

1. Firebase の Web コンソールで、プロジェクトを追加する。
1. 追加したプロジェクトで、ウェブアプリを追加する。

#### 本 Vue プロジェクトへの SDK 追加

Firebase Web コンソールの`プロジェクトの設定` - `マイアプリ`から[Firebase Web コンソールでの操作](#firebase-web-コンソールでの操作)で追加したウェブアプリを選択する。

`SDK の設定と構成`で`npm`を選択し、`SDKの追加`と`SDKの利用開始`を行う。

- SDK の追加

  ```sh
  npm install firebase
  ```

* SDK の利用開始

  `src/plugins/firebase.js`を追加し、`SDKの利用開始`に記載されているコードを転記する。

  このままだと、`src/plugins/firebase.js`をソース管理に登録した際に、API キーが外部に公開されてしまう。これを防ぐために、値の実態は環境変数ファイルに定義して、`src/plugins/firebase.js`では環境変数名で参照する。

  環境変数ファイルは、以下に定義する。

  - `.env`

    環境変数ファイル。  
    Vite を利用しているので、環境変数名の先頭に`VITE_`をつける。

  - `.env.local`

    ローカル環境のみ有効な環境変数ファイル。`.gitignore`に定義されているのでソース管理には登録されない。実際の値はこのファイルに定義する。

  Vite の環境変数についての詳細は[こちらを参照](https://ja.vitejs.dev/guide/env-and-mode.html)。

#### Firestore Database の利用開始

Firebase Web コンソールの左側のメニューで`構築`-`Firestore Database`をクリックし、`データベースの作成`をクリックする。

1. `名前とロケーションを設定する`では、任意のロケーションを選択する。

1. `ルールをセキュアにする`では、`テストモードで開始する`を選択する。

本 Vue プロジェクトに Firebase への登録処理を実装する。  
（`src/repositories/SafetyRepository.js`）
