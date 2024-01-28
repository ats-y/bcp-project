import { AuthRepository } from "./AuthRepository";
import { AuthRepositoryFirebase } from "./AuthRepositoryFirebase";

/**
 * 認証リポジトリクラスのインスタンスを生成する。
 * @returns {AuthRepository}
 */
export const createAuthRepository = () => {
  return new AuthRepositoryFirebase();
};
