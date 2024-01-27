/**
 * 安否状況リポジトリ
 */

import { Safety } from "../models/Safety";
import { firestore } from "../plugins/firebase";
import { doc, setDoc } from "firebase/firestore";

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
