/**
 * 安否状況リポジトリ
 */

import { Safety } from "../models/Safety";
import { sleepAsync } from "../utils/Sleep";

/**
 * 安否状況を登録する。
 * @param {Safety} safety 登録する安否状況。
 */
export const save = async (safety) => {
  // 登録処理に時間がかかっているフリをする。
  await sleepAsync(1000);
};
