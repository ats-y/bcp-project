/**
 * ユーザ
 */
export class User {
  /**
   * コンストラクタ
   * @param {String} uid
   * @param {String} name
   * @param {String[]} specialRoles
   */
  constructor(uid, name, specialRoles) {
    this.uid = uid;
    this.name = name;
    this.specialRoles = specialRoles;
  }

  uid;
  name;
  specialRoles = [];
}

/**
 * ユーザ権限：システム管理者
 */
export const SPECIAL_ROLE_ADMINISTRATOR = "システム管理者";

/**
 * ユーザ権限：管理者
 */
export const SPECIAL_ROLE_MANAGER = "管理者";
