<!--
  ログイン画面コンポーネント
-->

<script setup>
import { ref, inject } from "vue";
import { createAuthRepository } from "../../repositories/AuthRepositoryFactory";
import { loginUserStoreKey } from "../../stores/LoginUserStore";
import { router } from "../../router";
import { getUser } from "../../repositories/UserRepository";

/**
 * ログインID入力値
 * @type {ref<String>}
 */
const id = ref();

/**
 * パスワード入力値
 * @type {ref<String>}
 */
const password = ref();

/**
 * 通信中かどうか
 * @type {ref<Boolean>}
 */
const loading = ref();

/**
 * ログインユーザストアを注入する。
 * @type {ref<import("../../models/LoginUser").LoginUser>}
 */
const loginUserStore = inject(loginUserStoreKey);

/**
 * ログインする。
 */
const onLogin = async () => {
  console.log("onLogin()");
  loading.value = true;
  /** @type {import("../../models/LoginUser").LoginUser} */
  let loginUser;
  try {
    // 認証する。
    /** @type {import("../../repositories/AuthRepository").AuthRepository} */
    const authRepo = createAuthRepository();
    loginUser = await authRepo.signinAsync(id.value, password.value);

    // ユーザー情報を取得する。
    loginUser.user = await getUser(loginUser.uid);

    // ログインユーザをログインユーザストアに格納する。
    loginUserStore.value = loginUser;
  } catch (error) {
    console.error(error);
    alert(error);
    return;
  } finally {
    loading.value = false;
  }

  // 業務画面へ遷移する。
  if (loginUser.user == null) {
    // ユーザー情報が未登録の場合は、ユーザープロフィール編集画面へ。
    router.push({ name: "editProfile" });
  } else {
    // 安否登録画面へ遷移する。
    router.push({ name: "registerSafety" });
  }
};
</script>

<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-card elevation="2" width="500">
      <v-container>
        <v-row dense>
          <v-col>
            <v-card-title class="text-center">ログイン</v-card-title>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="id"
              label="ID"
              outlined
              type="email"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              label="パスワード"
              outlined
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-btn
              depressed
              color="primary"
              block
              @click="onLogin"
              :loading="loading"
            >
              ログイン
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
