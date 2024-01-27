import { ref } from "vue";

/**
 * ログインユーザストア。
 * @returns {ref} ログインユーザを格納するリアクティビティオブジェクト。
 */
export const getLoginUserStore = () => {
  /**
   * ログインユーザのリアクティブオブジェクト。
   * @type {ref<import "../models/LoginUser".LoginUser>}
   */
  const loginUser = ref();
  return loginUser;
};

/**
 * ログインユーザストアのキー。
 */
export const loginUserStoreKey = "loginUserStoreKey";
