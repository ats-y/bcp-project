<!--
  最新安否状況一覧画面コンポーネント
-->
<script setup>
import LatestStatusListByUserAsyncComponent from "./LatestStatusListByUserComponentAsync.vue";
</script>

<template>
  <Suspense>
    <!-- ユーザごとの最新状態一覧を表示する非同期コンポーネント -->
    <template #default>
      <LatestStatusListByUserAsyncComponent />
    </template>

    <!-- 非同期処理中に表示するテンプレート -->
    <template #fallback> loading.. </template>
  </Suspense>
</template>
