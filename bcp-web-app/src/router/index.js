import { createRouter, createWebHistory } from "vue-router";
import LoginComponent from "../components/pages/LoginComponent.vue";
import RegisterSafetyComponent from "../components/pages/RegisterSafetyComponent.vue";

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
];

/**
 * Routerインスタンスを生成する。
 */
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});
