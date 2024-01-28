<!--
  最新安否状況一覧画面の非同期コンポーネント
-->
<script setup>
import { ref } from "vue";
import { getAllUsers } from "../../../repositories/UserRepository";
import { getUserLatestSafety } from "../../../repositories/SafetyRepository";
import { Safety } from "../../../models/Safety";

/** データ取得中か */
const isLoading = ref(false);

/** 最新状態一覧に表示するデータ */
const userList = ref([]);

/**
 * 全ユーザーの直近安否状況を取得する。
 */
const getLatestUserList = async () => {
  // 表示リストの要素を全削除する。
  userList.value.splice(0);

  // 全ユーザ情報を取得する。
  const allUsers = await getAllUsers();

  // ユーザの直近安否状況を取得する。
  const latestSafetyMap = await getUserLatestSafety(3);

  // ユーザに直近安否状況を紐付けた一覧表示用リストを作成する。
  allUsers.forEach((user) => {
    const safety = latestSafetyMap.get(user.uid);
    userList.value.push({
      uid: user.uid,
      name: user.name,
      status: safety,
    });
  });
};

/**
 * 最新状態一覧を更新する。
 */
const onRefresh = async () => {
  isLoading.value = true;
  try {
    await getLatestUserList();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * 拡張表示可能かどうか判定する。
 * @param {Safety} status
 * @returns {Boolean} true:可能。
 */
const isShowExpand = (status) => {
  if (status) {
    if (0 < status.message?.length || 0 < status.reasonNotAbleWork?.length) {
      return true;
    }
  }
  return false;
};

/** 一覧の列定義。 */
const headerItems = [
  {
    title: "氏名",
    key: "name",
    align: "start",
  },
  {
    title: "安否状態",
    key: "status.safetyStatus",
    align: "start",
  },
  {
    title: "出勤可否",
    key: "status.canWork",
    align: "start",
  },
  {
    title: "登録日時",
    key: "status.timestamp",
    align: "start",
  },
];

/**
一覧の拡張表示している行を特定するための値を格納する配列。
v-data-table@items配列に格納されているオブジェクト要素のうち
v-data-table@item-valueで指定した要素名の値が格納される。
*/
const expanded = ref([]);

/**
 * ソート順。
 * 画面表示直後のソート順を指定しているが、リアクティブなので画面で選択したソート順が随時格納されていく。
 */
const sortBy = ref([{ key: "status.timestamp", order: "desc" }]);

// 最新状態を取得する。
await getLatestUserList();
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h6">全ユーザの最新安否状況一覧</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="1">
        <!-- 更新ボタン -->
        <v-btn
          text="更新"
          @click="onRefresh()"
          color="primary"
          variant="outlined"
          append-icon="mdi-refresh"
          :loading="isLoading"
        />
      </v-col>
    </v-row>
    <!--
      一覧。
      item-value属性で指定したオブジェクト要素の値で行を識別する。
      （拡張表示など。指定しないと全行が拡張表示されてしまう）
    -->
    <v-row dense>
      <v-col>
        <v-data-table
          v-model:headers="headerItems"
          v-model:items="userList"
          v-model:expanded="expanded"
          :sort-by="sortBy"
          item-value="name"
          show-expand
          :loading="isLoading"
        >
          <!-- 安否状態列の表示を制御 -->
          <template v-slot:item.status.safetyStatus="{ item }">
            {{ item?.status?.safetyStatus }}
            <v-icon
              v-if="item?.status?.message?.trim()"
              icon="mdi-message-alert"
            />
          </template>

          <!-- 出勤可否列の表示を制御 -->
          <template v-slot:item.status.canWork="{ item }">
            {{ item?.status?.canWork }}
            <v-icon
              v-if="item?.status?.reasonNotAbleWork?.trim()"
              icon="mdi-message-alert"
            />
          </template>

          <!-- 登録日時列の表示を制御 -->
          <template v-slot:item.status.timestamp="{ item }">
            {{ item?.status?.getTimestampText() }}
          </template>

          <!--　拡張表示 -->
          <template v-slot:expanded-row="{ columns, item }">
            <tr v-if="isShowExpand(item.status)">
              <td :colspan="columns.length">
                <v-sheet v-if="item.status.message" class="pa-2">
                  <h6>メッセージ</h6>
                  <p>{{ item.status.message }}</p>
                </v-sheet>
                <v-sheet v-if="item.status.reasonNotAbleWork" class="pa-2">
                  <h6>出勤不可理由</h6>
                  <p>{{ item.status.reasonNotAbleWork }}</p>
                </v-sheet>
              </td>
            </tr>
          </template>

          <!-- データ取得中表示 -->
          <template v-slot:loading>
            <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
