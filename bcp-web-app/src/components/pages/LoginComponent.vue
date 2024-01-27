<script setup>
import { ref, inject } from "Vue";
import { AuthRepository } from "../../repositories/AuthRepository";
import { loginUserStoreKey } from "../../stores/LoginUserStore";

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
    const authRepo = new AuthRepository();
    const loginUser = await authRepo.signinAsync(id.value, password.value);

    // ログインユーザをログインユーザストアに格納する。
    loginUserStore.value = loginUser;
  } finally {
    loading.value = false;
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
            <v-text-field v-model="id" label="ID" outlined></v-text-field>
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
