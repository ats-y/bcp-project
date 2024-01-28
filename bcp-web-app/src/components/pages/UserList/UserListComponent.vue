<!--
  ユーザー一覧画面コンポーネント
-->
<script setup>
import UserListComponentAsync from "./UserListComponentAsync.vue";
</script>

<template>
  <Suspense>
    <!-- ユーザ一覧を表示する非同期コンポーネント -->
    <template #default>
      <UserListComponentAsync />
    </template>

    <!-- 非同期処理中に表示するテンプレート -->
    <template #fallback> loading.. </template>
  </Suspense>
</template>
