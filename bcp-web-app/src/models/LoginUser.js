import { User } from "./User";

/**
 * ログインユーザ
 */
export class LoginUser {
  /**
   * UID
   * @type {String}
   */
  uid;

  /**
   * E-Mail
   * @type {String}
   */
  email;

  /**
   * ユーザー情報
   * @type {User}
   */
  user;

  /**
   * コンストラクタ
   * @param {String} uid
   * @param {String} email
   */
  constructor(uid, email) {
    this.uid = uid;
    this.email = email;
    this.user = null;
  }
}
