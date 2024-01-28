import { inject } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { loginUserStoreKey } from "../stores/LoginUserStore";
import LoginComponent from "../components/pages/LoginComponent.vue";
import RegisterSafetyComponent from "../components/pages/RegisterSafetyComponent.vue";
import EditProfileComponent from "../components/pages/EditProfileComponent.vue";
import UserListComponent from "../components/pages/UserList/UserListComponent.vue";
import {
  SPECIAL_ROLE_ADMINISTRATOR,
  SPECIAL_ROLE_MANAGER,
} from "../models/User";

/**
 * 本アプリのルート定義。
 * @typedef {Object} myRoute
 * @property {String} path Vue routerのRouteRecordSingleView.path
 * @property {String} name Vue routerのRouteRecordSingleView.name
 * @property {String} component Vue routerのRouteRecordSingleView.path
 * @property {String} displayText 表示文字列。
 * @property {String[]} allow ルートを利用できる権限一覧。未定義の場合は制限なし。
 */
/**
 * ルート定義。
 * ルートとコンポーネントをマッピング。
 * @type {myRoute[]}
 */
export const routes = [
  {
    path: "/",
    name: "login",
    component: LoginComponent,
  },
  {
    path: "/registerSafety",
    name: "registerSafety",
    component: RegisterSafetyComponent,
    displayText: "安否登録",
  },
  {
    path: "/userlist",
    name: "userlist",
    component: UserListComponent,
    allow: [SPECIAL_ROLE_ADMINISTRATOR],
    displayText: "ユーザー一覧",
  },
  {
    path: "/editProfile",
    name: "editProfile",
    component: EditProfileComponent,
    displayText: "プロファイル編集",
  },
];

/**
 * Routerインスタンスを生成する。
 */
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

/**
 * ナビゲーションの前に実行されるナビゲーションガード。
 */
router.beforeEach((to, from, next) => {
  // ログイン画面以外への遷移は、ログイン状態・権限によって制御する。
  if (to.name != "login") {
    // ログイン状態でなければ、ログイン画面に強制遷移させる。
    const loginUserStore = inject(loginUserStoreKey);
    if (loginUserStore.value == null) {
      console.log("権限なしの為、ログイン画面へ強制制御");
      next({ name: "login" });
      return;
    }

    // 遷移先のルートへ遷移する権限がなければ処理中断し、画面遷移を取り消し。
    const actualTo = routes.find((element) => element.name == to.name);
    if (!hasAuthority(actualTo)) {
      console.log("no authority");
      return;
    }
  }

  next();
});

/**
 * ルートに遷移する権限があるか判定する。
 * @param {myRoute} to ルート
 * @returns {Boolean} 遷移可否（true:遷移可）
 */
export const hasAuthority = (to) => {
  // ログイン画面への移動はどんな状態でもOK。
  if (to.name == "login") {
    return true;
  }

  // ログイン画面以外は、ログイン状態であれば遷移可。
  const loginUser = inject(loginUserStoreKey);
  if (loginUser.value != null) {
    // ログインユーザーの状態による。
    if (!loginUser.value.user) {
      // ユーザー情報が未設定の場合は、ユーザープロフィール編集画面のみ遷移可。
      if (to.name == "editProfile") {
        return true;
      }
    } else {
      // ルートに権限設定がなければ遷移可。
      if (to.allow == null || to.allow.length == 0) {
        return true;
      }

      // ログインユーザーの権限が、遷移先に権限があるか。
      for (const a of to.allow) {
        if (loginUser.value.user.specialRoles?.includes(a)) {
          // 権限あり。
          return true;
        }
      }
    }
  }

  // 上記以外は遷移不可。
  return false;
};
