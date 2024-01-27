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
