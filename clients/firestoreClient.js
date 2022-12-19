import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./firestore/coderhouse-32185-firebase-adminsdk-ovqer-1634f9c39a.json', 'utf-8'));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coderhouse-32185.firebaseio.com',
});

export const firestoreDatabase = admin.firestore();