import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ThinkYe } from '../models/classes/think-ye';
import { Thought } from '../models/classes/thought';
import { User } from '../models/classes/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  private getThinkYesCollection = (uid: string): AngularFirestoreCollection<ThinkYe> => this.firestore.collection(`users/${uid}/think-yes`);

  private getThoughtsCollection = (uid: string, thinkYeId: string): AngularFirestoreCollection<Thought> => this.firestore.collection(`users/${uid}/think-yes/${thinkYeId}/thoughts`);


  getUserValueChanges = (uid: string) => this.firestore.doc<User>(`users/${uid}`).valueChanges();

  updateUserData({ uid, email }: User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${uid}`);

    const data = {
      uid,
      email
    };
    return userRef.set(data, { merge: true });
  }

  getThinkYes(uid: string) {
    let thinkYesCol = this.getThinkYesCollection(uid);

    return thinkYesCol.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return new ThinkYe(a.payload.doc.id, a.payload.doc.data().question, a.payload.doc.data().thoughts);
        });
      })
    );
  }

  getThoughtsForThinkYe(uid: string, thinkYeId: string) {
    let thoughtsCol = this.getThoughtsCollection(uid, thinkYeId);

    return thoughtsCol.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return new Thought(a.payload.doc.id, a.payload.doc.data().value);
        });
      })
    );
  }

  createThinkYe(uid: string, thinkYe: ThinkYe) {
    return new Promise<boolean>((resolve, reject) => {
      if (!thinkYe.id) {
        thinkYe.id = this.firestore.createId();
      }
      let thinkYeCol = this.getThinkYesCollection(uid);
      return thinkYeCol.doc(thinkYe.id).set({
        id: thinkYe.id,
        question: thinkYe.question,
        thoughts: []
      }).then(() => resolve(true))
        .catch((reason) => {
          console.error(reason);
          reject(false);
        });
    });
  }

  deleteThinkYe(uid: string, thinkYeId: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.getThinkYesCollection(uid).doc(thinkYeId).delete().then(() => resolve(true))
        .catch((reason) => {
          console.error(reason);
          reject(false);
        });
    });
  }

  deleteThought(uid: string, thinkYeId: string, thoughtId: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.getThoughtsCollection(uid, thinkYeId).doc(thoughtId).delete().then(() => resolve(true))
        .catch((reason) => {
          console.error(reason);
          reject(false);
        });
    });
  }
}
