/**
 * 安否状況リポジトリ
 */

import { Safety } from "../models/Safety";
import { firestore } from "../plugins/firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

const COLLECTION_NAME = "SafetyStates";

/**
 * 安否状況を登録する。
 * @param {Safety} safety 登録する安否状況。
 */
export const save = async (safety) => {
  // キーを生成する。
  const timestamp = new Date(safety.timestamp);
  const key = `${timestamp.toISOString()}_${safety.uid}`;

  // Firestoreへ登録する。
  const docRef = doc(firestore, COLLECTION_NAME, key);
  await setDoc(
    docRef,
    {
      uid: safety.uid,
      timestamp: safety.timestamp,
      name: safety.name,
      safetyStatus: safety.safetyStatus,
      canWork: safety.canWork,
      reasonNotAbleWork: safety.reasonNotAbleWork,
      message: safety.message,
    },
    { merge: true }
  );
};

/**
 * ユーザの最新安否状況を取得する。
 *
 * @param {Number} pastDays
 * @returns {Map<String,Safety>} 最新安否状況Map(Key : uid、Value : Safety)
 */
export const getUserLatestSafety = async (pastDays) => {
  const result = new Map();
  const snapshot = await getDocs(collection(firestore, COLLECTION_NAME));
  snapshot.forEach((doc) => {
    const safety = new Safety(
      doc.data().uid,
      doc.data().name,
      doc.data().timestamp,
      doc.data().safetyStatus,
      doc.data().canWork,
      doc.data().reasonNotAbleWork,
      doc.data().message
    );

    const pre = result.get(safety.uid);
    if (pre == null || (pre != null && pre.timestamp < safety.timestamp)) {
      result.set(safety.uid, safety);
    }
  });
  return result;
};
