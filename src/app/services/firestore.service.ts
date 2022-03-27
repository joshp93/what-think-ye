import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ThinkYe } from '../models/classes/think-ye';
import { Thought } from '../models/classes/thought';
import { User } from '../models/classes/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  user: User;
  constructor(private firestore: AngularFirestore, private auth: AuthService) {
    this.getUser().subscribe(fUser => {
      if (fUser) {
        this.user = new User(fUser.uid, fUser.email);
        this.updateUserData(this.user);
      }
    });
  }

  getUser() {
    return this.auth.getAuthState();
  }

  private getThinkYesCollectionRef = (uid: string): AngularFirestoreCollection<ThinkYe> => this.firestore.collection(`think-yes`, ref => ref.where("uid", "==", uid));

  private getThinkYeDocumentRef = (thinkYeId: string): AngularFirestoreDocument<ThinkYe> => this.firestore.doc(`think-yes/${thinkYeId}`);

  private getThoughtsCollectionRef = (thinkYeId: string): AngularFirestoreCollection<Thought> => this.firestore.collection(`think-yes/${thinkYeId}/thoughts`);

  private getThoughtDocumentRef = (thinkYeId: string, thoughtId: string): AngularFirestoreDocument<Thought> => this.firestore.doc(`think-yes/${thinkYeId}/thoughts/${thoughtId}`);

  getUserValueChanges = (uid: string) => this.firestore.doc<User>(`users/${uid}`).valueChanges();

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email
    };
    return userRef.set(data, { merge: true });
  }

  getThinkYes() {
    let thinkYesCol = this.getThinkYesCollectionRef(this.user.uid);

    return thinkYesCol.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return new ThinkYe(a.payload.doc.id, a.payload.doc.data().question, a.payload.doc.data().uid);
        });
      })
    );
  }

  getThinkYe(thinkYeId: string) {
    let thinkYeRef = this.getThinkYeDocumentRef(thinkYeId);

    return thinkYeRef.valueChanges();
  }

  getThoughtsForThinkYe(thinkYeId: string) {
    let thoughtsCol = this.getThoughtsCollectionRef(thinkYeId);

    return thoughtsCol.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return new Thought(a.payload.doc.id, a.payload.doc.data().value);
        });
      })
    );
  }

  createThinkYe(thinkYe: ThinkYe) {
    return new Promise<boolean>((resolve, reject) => {
      if (!thinkYe.id) {
        thinkYe.id = this.generateShortId();
      }
      let thinkYeCol = this.getThinkYesCollectionRef(thinkYe.uid);
      return thinkYeCol.doc(thinkYe.id).set({
        id: thinkYe.id,
        question: thinkYe.question,
        uid: this.user.uid
      }).then(() => resolve(true))
        .catch((reason) => {
          console.error(reason);
          reject(false);
        });
    });
  }

  createThought(thinkYeId: string, value: string) {
    return new Promise<boolean>((resolve, reject) => {
      const thoughtId = this.firestore.createId();
      let thoughtDoc = this.getThoughtDocumentRef(thinkYeId, thoughtId);
      return thoughtDoc.set({
        id: thoughtId,
        value: value
      }).then(() => resolve(true))
        .catch((reason) => {
          console.error(reason);
          reject(false);
        });
    });
  }

  deleteThinkYe(thinkYe: ThinkYe) {
    return new Promise<boolean>((resolve, reject) => {
      this.getThinkYesCollectionRef(thinkYe.uid).doc(thinkYe.id).delete().then(() => resolve(true))
        .catch((reason) => {
          console.error(reason);
          reject(false);
        });
    });
  }

  deleteThought(thinkYeId: string, thoughtId: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.getThoughtsCollectionRef(thinkYeId).doc(thoughtId).delete().then(() => resolve(true))
        .catch((reason) => {
          console.error(reason);
          reject(false);
        });
    });
  }

  private generateShortId() {
    let firstPart = (Math.random() * 46656).toString();
    let secondPart = (Math.random() * 46656).toString();
    firstPart = ("000" + firstPart).slice(-3);
    secondPart = ("000" + secondPart).slice(-3);
    return firstPart + secondPart;
  }
}
