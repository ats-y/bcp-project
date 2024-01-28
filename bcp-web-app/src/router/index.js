import { inject } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { loginUserStoreKey } from "../stores/LoginUserStore";
import LoginComponent from "../components/pages/LoginComponent.vue";
import RegisterSafetyComponent from "../components/pages/RegisterSafetyComponent.vue";
import EditProfileComponent from "../components/pages/EditProfileComponent.vue";

/**
 * ルート定義。
 * ルートとコンポーネントをマッピング。
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
  }
  next();
});
