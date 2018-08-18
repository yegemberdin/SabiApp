import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCx7cCl4IXLOnzYXiCHkKxgo9n5Drdnde4",
    authDomain: "app2-1d20a.firebaseapp.com",
    databaseURL: "https://app2-1d20a.firebaseio.com",
    projectId: "app2-1d20a",
    storageBucket: "app2-1d20a.appspot.com",
  };
  export const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const db=firebase.database();