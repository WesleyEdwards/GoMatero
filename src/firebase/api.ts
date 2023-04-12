import {
  User,
  UserInfo,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase_sdk";

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
}
