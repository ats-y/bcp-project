/**
 * 安否状況
 */
export class Safety {
  /**
   * 対象者のUID。
   * @type {String}
   */
  uid;

  /**
   * 対象者の氏名。
   * @type {String}
   */
  name;

  /**
   * 安否状況登録日時。
   * @type {Date}
   */
  timestamp;

  /**
   * 安否状況。
   * @type {String}
   */
  safetyStatus;

  /**
   * 勤務可否。
   * @type {String}
   */
  canWork;

  /**
   * 勤務不可理由。
   * @type {String}
   */
  reasonNotAbleWork;

  /**
   * メッセージ。
   * @type {String}
   */
  message;

  /**
   * コンストラクタ
   * @param {String} uid 対象者のUID。
   * @param {String} name 対象者の氏名。
   * @param {Date} timestamp 安否状況登録日時。
   * @param {String} safetyStatus 安否状況。
   * @param {String} canWork 勤務可否。
   * @param {String} reasonNotAbleWork 勤務不可理由。
   * @param {String} message メッセージ。
   */
  constructor(
    uid,
    name,
    timestamp,
    safetyStatus,
    canWork,
    reasonNotAbleWork,
    message
  ) {
    this.uid = uid;
    this.name = name;
    this.timestamp = timestamp;
    this.safetyStatus = safetyStatus;
    this.canWork = canWork;
    this.reasonNotAbleWork = reasonNotAbleWork;
    this.message = message;
  }

  /**
   * Date値(ms)からyyyy/M/d H:mm形式の文字列を取得します。
   * @returns yyyy/M/d H:mm形式の文字列
   */
  getTimestampText() {
    const time = new Date(this.timestamp);
    return (
      `${time.getFullYear()}/${
        time.getMonth() + 1
      }/${time.getDate()} ${time.getHours()}:` +
      String(time.getMinutes()).padStart(2, "0")
    );
  }
}
