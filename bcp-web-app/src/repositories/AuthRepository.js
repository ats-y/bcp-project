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
    await sleepAsync(1000);
    return new LoginUser("DummyUid", "stub_user@test.com");
  }

  /**
   * サインアウトする。
   */
  async signOutAsync() {}

  /**
   * 現在ログイン中のユーザのパスワードを変更する。
   * @param {String} newPassword 変更後のパスワード
   */
  async updatePassword(newPassword) {
    throw new Error("処理未定義");
  }
}
