import { sleepAsync } from "../utils/Sleep";
import { LoginUser } from "../models/LoginUser";

/**
 * 認証リポジトリ。
 */
export class AuthRepository {
  /**
   * ログインIDとパスワードで認証する。
   * @param {String} id ログインID。
   * @param {String} password パスワード。
   * @returns {LoginUser} ログインユーザ情報。
   */
  async signinAsync(id, password) {
    await sleepAsync(2000);
    return new LoginUser(id, "すたぶ しめい", "stub_user@test.com");
  }
}
