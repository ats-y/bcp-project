<!--
  ユーザー権限編集画面コンポーネント
-->
<script setup>
import { reactive, ref } from "vue";
import {
  User,
  SPECIAL_ROLE_ADMINISTRATOR,
  SPECIAL_ROLE_MANAGER,
} from "../../../models/User";

/**
 * 親Componentからデータを受け取るPropsを宣言する。
 */
const props = defineProps({
  title: String,
  description: String,
  user: User,
});

/**
 * 親Componentの関数を呼び出すEmitの定義。
 */
const emits = defineEmits(["save"]);

/**
 * 画面の入力項目と双方向バインディングするオブジェクトを定義。
 * */
const userInfo = reactive({
  name: props.user.name,
  email: props.user.email,
  password: props.user.password,
});

/**
 * 保存ボタンイベントハンドラ。
 */
const onSave = () => {
  const actualRoles = [];
  selectedRoles.value.forEach((v) => {
    actualRoles.push(v);
  });

  // 入力内容からUserインスタンスを生成する。
  const user = new User(props.user.uid, userInfo.name, actualRoles);

  // Emitを利用して、本コンポーネント呼び出し元のsave関数を呼び出す。
  emits("save", user);
};

/**
 * 権限選択肢
 */
const selectableRoles = [SPECIAL_ROLE_ADMINISTRATOR, SPECIAL_ROLE_MANAGER];

/**
 * 選択中の権限
 */
const selectedRoles = ref(props.user.specialRoles);
</script>

<template>
  <v-card>
    <v-card-title>{{ props.title }}</v-card-title>
    <v-card-subtitle>{{ props.description }}</v-card-subtitle>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="氏名" v-model="userInfo.name" disabled />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="selectedRoles"
              :items="selectableRoles"
              chips
              label="特別権限"
              multiple
              outlined
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <!--
        キャンセルボタン。
        emitで親コンポーネントにcancelイベントを発行する。
      -->
      <v-btn @click="$emit('cancel')"> キャンセル </v-btn>

      <!--
        保存ボタン。
      -->
      <v-btn color="primary" @click="onSave"> 保存 </v-btn>
    </v-card-actions>
  </v-card>
</template>
