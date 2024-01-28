<!--
  ログイン画面コンポーネント
-->

<script setup>
import { ref, inject } from "vue";
import { createAuthRepository } from "../../repositories/AuthRepositoryFactory";
import { loginUserStoreKey } from "../../stores/LoginUserStore";
import { router } from "../../router";

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
 * @type {ref<import "../../models/LoginUser">}
 */
const loginUserStore = inject(loginUserStoreKey);

/**
 * ログインする。
 */
const onLogin = async () => {
  console.log("onLogin()");
  loading.value = true;
  try {
    // 認証する。
    const authRepo = createAuthRepository();
    const loginUser = await authRepo.signinAsync(id.value, password.value);

    // ログインユーザをログインユーザストアに格納する。
    loginUserStore.value = loginUser;
  } catch (error) {
    console.error(error);
    alert(error);
  } finally {
    loading.value = false;
  }

  // 安否登録画面へ遷移する。
  router.push({ name: "registerSafety" });
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
