/**
 * ログインユーザ
 */
export class LoginUser {
  /**
   * コンストラクタ
   * @param {String} uid
   * @param {String} email
   */
  constructor(uid, name, email) {
    this.uid = uid;
    this.name = name;
    this.email = email;
  }

  /**
   * UID
   * @type {String}
   */
  uid;

  /**
   * 氏名
   * @type {String}
   */
  name;

  /**
   * E-Mail
   * @type {String}
   */
  email;
}
