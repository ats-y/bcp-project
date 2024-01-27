<script setup>
import { ref, inject } from "vue";
import { loginUserStoreKey } from "./stores/LoginUserStore";

/**
 * ログインユーザストアを注入する。
 * @type {ref<import "../../models/LoginUser">}
 */
const loginUserStore = inject(loginUserStoreKey);

/**
 * ナビゲーションドロアーの表示状態。
 * @type {Boolean}
 */
const isShowDrawer = ref(false);

/**
 * ログアウトする。
 */
const onLogout = () => {
  console.log("onLogout()");

  // ログインユーザストアのログインユーザを削除。
  loginUserStore.value = null;
};
</script>

<template>
  <v-app>
    <!-- 画面上部のバー領域 -->
    <v-app-bar>
      <!-- メニューアイコン -->
      <v-app-bar-nav-icon
        @click.stop="isShowDrawer = !isShowDrawer"
      ></v-app-bar-nav-icon>

      <!-- タイトル -->
      <v-app-bar-title>安否登録</v-app-bar-title>

      <!-- スペーサー -->
      <!-- <v-spacer></v-spacer> -->

      <!-- ログインユーザ名 -->
      <div class="mr-5">{{ loginUserStore?.name }}</div>
    </v-app-bar>

    <!-- 画面左部のメニュー領域 -->
    <v-navigation-drawer v-model="isShowDrawer" location="left" temporary>
      <v-list>
        <v-list-item title="メニュー"></v-list-item>
        <v-divider />
        <v-divider />
        <v-list-item title="ログアウト" @click="onLogout"> </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- メイン領域 -->
    <v-main class="d-flex align-start justify-center" style="min-height: 300px">
      <!-- ルートとマッチングしたコンポーネントを表示する -->
      <router-view />
    </v-main>
  </v-app>
</template>
