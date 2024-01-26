<script setup>
import { ref } from "vue";

/**
 * ログインID入力値
 * @type{string}
 */
const id = ref();

/**
 * パスワード入力値
 * @type{string}
 */
const password = ref();

/**
 * 通信中かどうか
 * @type{Boolean}
 */
const loading = ref(false);

/**
 * ログイン
 */
const login = () => {
  console.log("login()");
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
              @click="login"
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
