import { User } from "../models/User";
import { firestore } from "../plugins/firebase";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

const COLLECTION_NAME = "Users";

/**
 * 全ユーザ情報を取得する。
 * @returns Userクラス配列。
 */
export const getAllUsers = async () => {
  const result = [];
  const snapshot = await getDocs(collection(firestore, COLLECTION_NAME));
  snapshot.forEach((doc) => {
    result.push(
      new User(doc.id, doc.data().name, doc.data().email, doc.data().roles)
    );
  });
  return result;
};

/**
 * ユーザー情報を取得する。
 * @param {string} uid UID
 * @returns {User} uidに一致するユーザー情報。
 */
export const getUser = async (uid) => {
  const ref = doc(firestore, COLLECTION_NAME, uid);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return new User(
    uid,
    snapshot.data().name,
    snapshot.data().email,
    snapshot.data().roles
  );
};

/**
 * ユーザー情報を登録する。
 * @param {User} user 登録対象のユーザー情報。
 */
export const save = async (user) => {
  // 引数のユーザ情報がProxyの場合があるので、プリミティブな要素で抜き出す。
  const name = user.name;
  let roles = [];
  if (user.roles != null) {
    roles = user.roles;
  }

  // Firebaseへ登録する。
  await setDoc(
    doc(firestore, COLLECTION_NAME, user.uid),
    { name: name, roles: roles },
    { merge: true }
  );
};
