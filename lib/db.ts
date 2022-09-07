import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, setDoc, doc } from "firebase/firestore";
import getConfig from "next/config";
import moment from "moment";
import { uid } from "uid";

export interface Chit {
  id: string;
  author: string;
  content: string;
  createdAt: number;
};

export interface NewChit {
  author: string;
  content: string;
  createdAt?: number;
}

const { publicRuntimeConfig } = getConfig();

const firebaseConfig = {
  apiKey: publicRuntimeConfig.apiKey,
  authDomain: publicRuntimeConfig.authDomain,
  projectId: publicRuntimeConfig.projectId,
  storageBucket: publicRuntimeConfig.storageBucket,
  messagingSenderId: publicRuntimeConfig.messagingSenderId,
  appId: publicRuntimeConfig.appId,
  measurementId: publicRuntimeConfig.measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getChits = async () => {
  let chitsList: Array<Chit>;

  try {
    const chitsRef = collection(db, "chits");
    const chitsSnapshot = await getDocs(chitsRef);

    chitsList = chitsSnapshot.docs
      .map((doc) => doc.data())
      .sort((a, b) => ((b.createdAt < a.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0))) as Array<Chit>;

    return chitsList;
  } catch (e) {
    console.error(e);
    chitsList = [];
    return chitsList;
  }
};

export const createChit = async (newChit: NewChit) => {
  let id = uid(20);
  let createdAt = moment().valueOf();
  newChit.createdAt = createdAt;

  try {
    await setDoc(doc(db, "chits", id), newChit);
  } catch (e) {
    console.error(e);
  }
};
