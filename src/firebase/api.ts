import {
  User,
  UserInfo,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { MATE_SESSIONS_REF, PUBLIC_USERS_REF, auth, db } from "./firebase_sdk";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { MateSession, PublicUser } from "../utils/models";

export class Api {
  async createUser(
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    const user = await this.createAccount(email, password);
    await this.updateProfile(name);
    await this.createPublicProfile(user);
    return user;
  }

  signIn(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        return userCredential.user;
      }
    );
  }

  private createAccount(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        return userCredential.user;
      }
    );
  }

  private updateProfile(displayName: string): Promise<unknown> {
    if (!auth.currentUser) {
      return Promise.reject("No user is signed in");
    }
    return updateProfile(auth.currentUser, {
      displayName,
    });
  }

  async createPublicProfile(user: User): Promise<PublicUser> {
    if (!user.displayName || !user.email) return Promise.reject("No user info");

    const userInfo: PublicUser = {
      uid: user.uid,
      name: user.displayName!,
      email: user.email!,
    };

    await addDoc(collection(db, PUBLIC_USERS_REF), userInfo);
    return userInfo;
  }

  async fetchPublicUsers(): Promise<PublicUser[]> {
    const queryOfDoc = query(
      collection(db, PUBLIC_USERS_REF),
      where("uid", "!=", auth.currentUser?.uid)
    );
    const querySnapshot = await getDocs(queryOfDoc);

    const publicUsers: PublicUser[] = querySnapshot.docs.map(
      (doc) => doc.data() as PublicUser
    );

    return publicUsers;
  }

  async addMateSession(session: MateSession): Promise<unknown> {
    return addDoc(collection(db, MATE_SESSIONS_REF), session);
  }

  async fetchMateSessions(): Promise<MateSession[]> {
    const queryOfDoc = query(
      collection(db, MATE_SESSIONS_REF),
      where("owner", "==", auth.currentUser?.uid)
    );
    const querySnapshot = await getDocs(queryOfDoc);

    const mateSessions: MateSession[] = querySnapshot.docs.map(
      (doc) => doc.data() as MateSession
    );

    return mateSessions;
  }

  async publicUsers(users: string[]): Promise<PublicUser[]> {
    const queryOfDoc = query(
      collection(db, PUBLIC_USERS_REF),
      where("uid", "in", users)
    );
    const querySnapshot = await getDocs(queryOfDoc);

    const publicUsers: PublicUser[] = querySnapshot.docs.map(
      (doc) => doc.data() as PublicUser
    );

    return publicUsers;
  }
}
