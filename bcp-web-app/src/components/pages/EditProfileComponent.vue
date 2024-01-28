<!--
  ユーザープロフィール編集画面コンポーネント
-->
<script setup>
import { ref, inject } from "vue";
import { loginUserStoreKey } from "../../stores/LoginUserStore";
import { User } from "../../models/User";
import { save as saveUser } from "../../repositories/UserRepository";
import { createAuthRepository } from "../../repositories/AuthRepositoryFactory";

/**
 * 入力ルール。
 */
const rules = {
  required: (value) => !!value || "省略できません。入力してください。",
  min: (v) => v.length >= 6 || "6文字以上入力してください。",
};

/**
 * ストアから認証情報を取得しておく。
 * @type {ref<import("../../models/LoginUser").LoginUser>}
 */
const loginUserStore = inject(loginUserStoreKey);

/**
 * パスワードを表示するかどうか（true:表示する、false:マスクする）
 * @type {ref<Boolean>}
 */
const isShowPassword = ref(false);

/**
 * 入力フォームの入力値が妥当かどうか。
 * @type {ref<Boolean>}
 */
const isValid = ref();

/**
 * 登録処理中かどうか。
 * @type {ref<Boolean>}
 */
const isSaving = ref(false);

/**
 * 各入力エリアの入力値。
 * @type {ref<{name: {String}, password: {String}}}
 */
const input = ref({
  name: "",
  password: "",
});

/**
 * ユーザープロファイルを登録する。
 */
const onSave = async () => {
  // 入力フォームの検証結果が全て有効でなければ何もしない。
  if (!isValid.value) return;

  // 確認ダイアログを表示する。
  if (!window.confirm("登録してよろしいですか？")) {
    return;
  }

  // 登録する。
  try {
    isSaving.value = true;

    // ユーザー情報を更新する。
    const user = new User(loginUserStore.value.uid, input.value.name, null);
    try {
      await saveUser(user);
    } catch (error) {
      console.error(error);
      alert("ユーザー情報の登録に失敗しました。");
      return;
    }

    // パスワードを更新する。
    try {
      const authRepo = createAuthRepository();
      await authRepo.updatePassword(input.value.password);
    } catch (error) {
      console.error(error);
      alert("パスワードの更新に失敗しました。");
      return;
    }
  } finally {
    isSaving.value = false;
  }
  alert("パスワード変更完了！");
};

// ユーザー情報があれば、氏名を初期表示する。
input.value.name = loginUserStore.value.user?.name;
</script>
<template>
  <!-- 入力フォーム -->
  <v-form v-model="isValid" @submit.prevent>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h6">
            本サービスを利用するために氏名とパスワードを設定してください。
          </div>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-text-field
            label="表示氏名"
            v-model="input.name"
            clearable
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-text-field
            label="パスワード"
            v-model="input.password"
            :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isShowPassword ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            @click:append="isShowPassword = !isShowPassword"
            clearable
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-btn
            color="primary"
            type="submit"
            @click="onSave"
            :loading="isSaving"
          >
            登録
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
