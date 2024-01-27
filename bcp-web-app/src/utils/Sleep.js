/**
 * 指定した時間スリープする。
 * @param {Number} ms スリープする時間（ms）
 * @returns {Promise} 非同期オブジェクト
 */
export const sleepAsync = async (ms) => {
  // 非同期処理オブジェクトを生成して返却する。
  return new Promise((resolve, reject) => {
    // 非同期処理。
    console.log("start sleep");
    // 指定ミリ秒後に処理成功コールバックを呼び出す。
    setTimeout(() => {
      console.log("finish sleep");
      // 呼び出し元に処理完了を通知する。
      resolve();
    }, ms);
  });
};
