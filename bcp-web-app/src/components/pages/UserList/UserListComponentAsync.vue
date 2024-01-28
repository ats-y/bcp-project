<!--
  ユーザ一覧を表示する非同期コンポーネント
  非同期コンポーネント…script setupで非同期処理を行うコンポーネント。
-->
<script setup>
import { ref } from "vue";
import EditUserComponent from "./EditUserComponent.vue";
import { save } from "../../../repositories/UserRepository";
import { User } from "../../../models/User";
import { getAllUsers } from "../../../repositories/UserRepository";

/**
 * ヘッダー要素
 * @typedef header
 * @property {string} title 表示する列タイトル
 * @property {string} key 列の識別子
 * @property {string} align
 */
/**
 * v-data-tableのヘッダ定義。
 * @type {header[]}
 */
const headerItems = [
  {
    title: "名前",
    key: "name",
    align: "start",
  },
  {
    title: "権限",
    key: "roles",
    align: "start",
  },
  {
    title: "権限編集",
    key: "actions",
  },
];

// 一覧表示するユーザー情報を取得する。
/** @type {ref<User[]>} */
const userList = ref(await getAllUsers());

// ユーザー情報編集ダイアログの表示状態。
const dialog = ref(false);

// 編集ボタンをクリックしたユーザー情報のインデックス。
let editIndex;

/**
 * ユーザ一覧の編集アイコンクリックイベントハンドラ。
 * @param {User} user
 */
const onEdit = (user) => {
  // ユーザー情報編集ダイアログの編集コンポーネントに対象のユーザ情報を渡してダイアログを表示する。
  editIndex = userList.value.indexOf(user);

  // ダイアログを表示する。
  dialog.value = true;
};

/**
 * ユーザー編集コンポーネントのキャンセルボタンイベントハンドラ。
 */
const onCancel = () => {
  // ダイアログを閉じる。
  dialog.value = false;
};

/**
 * ユーザー編集コンポーネントの保存ボタンイベントハンドラ。
 * @param {User} user
 */
const onSave = (user) => {
  // ユーザ情報を保存する。
  save(user);

  // ダイアログを閉じる。
  dialog.value = false;

  // ユーザー一覧の編集対象行を更新する。
  Object.assign(userList.value[editIndex], user);
};
</script>

<template>
  <!-- ユーザー情報編集ダイアログ -->
  <v-dialog v-model="dialog" persistent width="500">
    <!-- 
      ユーザー情報編集コンポーネント
      子コンポーネントのdefinePropsで定義されたuserに渡したいデータを指定する。
      子コンポーネントで定義されている$emitのコールバック関数を購読する（@cancel、@save）
    -->
    <EditUserComponent
      :title="'ユーザー権限編集'"
      :description="'ユーザの権限を編集します。'"
      :user="userList[editIndex]"
      @cancel="onCancel"
      @save="onSave"
    />
  </v-dialog>

  <!-- ユーザー一覧 -->
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h6">ユーザー一覧</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headerItems" :items="userList">
          <!-- 権限列の表示制御 -->
          <template v-slot:item.roles="{ item }">
            {{ item.specialRoles?.join(", ") }}
          </template>

          <!-- 操作列の表示制御 -->
          <template v-slot:item.actions="{ item }">
            <v-icon @click="onEdit(item)">mdi-pencil</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
