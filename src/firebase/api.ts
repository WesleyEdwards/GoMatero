import {
  User,
  UserInfo,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase_sdk";
import { addDoc, collection } from "firebase/firestore";

export class Api {
  createUser(email: string, password: string, name: string): Promise<User> {
    return this.createAccount(email, password).then((user) => {
      return this.updateProfile(name).then(() => {
        return user;
      });
    });
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
        userCredential.user.displayName;
        this.createPublicProfile(userCredential.user);
        return userCredential.user;
      }
    );
  }

  private updateProfile(name: string): Promise<unknown> {
    if (!auth.currentUser) {
      return Promise.reject("No user is signed in");
    }
    return updateProfile(auth.currentUser, {
      displayName: "Jane Q. User",
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {});
  }

  async createPublicProfile(user: User): Promise<PublicUser> {
    if (!user.displayName || !user.email) return Promise.reject("No user info");

    const userInfo: PublicUser = {
      uid: user.uid,
      name: user.displayName!,
      email: user.email!,
    };

    const docRef = await addDoc(collection(db, "public-users"), userInfo);
    console.log("Document written with ID: ", docRef);
    return userInfo;
  }
}

type PublicUser = {
  uid: string;
  name: string;
  email: string;
};
