import firebase from "firebase/compat/app";
require("firebase/compat/firestore");
require("firebase/compat/auth");

const config = {
  apiKey: "AIzaSyCwpDwpQeC4inL07hyl4ORh2JDB29hnmsI",

  authDomain: "crwn-db-2a300.firebaseapp.com",

  projectId: "crwn-db-2a300",

  storageBucket: "crwn-db-2a300.appspot.com",

  messagingSenderId: "60739775132",

  appId: "1:60739775132:web:cbdf1a2700508d094f5b59",

  measurementId: "G-DG3SZHMB6E",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //if user does not exist return
  if (!userAuth) return;

  //query for document with userAuth id
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //getting the snapshot of userRef
  const snapShot = await userRef.get();


  //if snapShot does not exist create a new user
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
