<!--
  安否状況登録画面コンポーネント
-->

<script setup>
import { ref } from "vue";

/**
 * 安否状況の入力内容
 * @type {ref<String>}
 */
const safetyStatus = ref("無事");

/**
 * 勤務可否の入力内容
 * @type {ref<Boolean>}
 */
const canWork = ref("可能");

/**
 * 勤務不可理由の入力内容
 * @type {ref<String>}
 */
const reasonNotAbleWork = ref("");

/**
 * メッセージの入力内容
 * @type {ref<String>}
 */
const message = ref("");

const loading = ref(false);

/**
 * 入力した安否状況を登録する。
 */
const onRegister = async () => {
  console.log(canWork.value);
  alert(`安否情報を登録しました。`);
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h6">安否状況を登録してください。</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="text-subtitle-1">本人安否状況</div>
        <v-btn-toggle v-model="safetyStatus" rounded="0" group color="primary">
          <v-btn value="無事"> 無事 </v-btn>
          <v-btn value="負傷"> 負傷 </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="text-subtitle-1">勤務可否</div>
        <v-btn-toggle
          divided
          v-model="canWork"
          rounded="0"
          group
          color="primary"
        >
          <v-btn value="可能"> 可能 </v-btn>
          <v-btn value="不可能"> 不可能 </v-btn>
          <v-btn value="不明"> 不明 </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-textarea
          label="勤務不可能理由"
          placeholder="勤務不可能な場合、その理由を入力してください。"
          clearable
          rows="1"
          clear-icon="mdi-close-circle"
          v-model="reasonNotAbleWork"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-textarea
          label="メッセージ"
          placeholder="特に伝えておきたいことを入力してください。"
          clearable
          rows="2"
          clear-icon="mdi-close-circle"
          v-model="message"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-btn color="primary" @click="onRegister" :loading="loading"
          >登録</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
