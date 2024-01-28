import {
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "../plugins/firebase";
import { AuthRepository } from "./AuthRepository";
import { LoginUser } from "../models/LoginUser";

/**
 * 認証リポジトリ。
 */
export class AuthRepositoryFirebase extends AuthRepository {
  /**
   * ログインIDとパスワードで認証する。
   * @param {String} id ログインID。
   * @param {String} password パスワード。
   * @returns {LoginUser} ログインユーザ情報。
   */
  async signinAsync(id, password) {
    const credential = await signInWithEmailAndPassword(auth, id, password);
    return new LoginUser(credential.user.uid, credential.user.email);
  }

  /**
   * サインアウトする。
   */
  async signOutAsync() {
    await signOut(auth);
  }

  /**
   * 現在ログイン中のユーザのパスワードを変更する。
   * @param {String} newPassword 変更後のパスワード
   */
  async updatePassword(newPassword) {
    const user = auth.currentUser;
    await updatePassword(user, newPassword);
  }
}
