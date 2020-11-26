import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCilte-yzX3DL2X77SqhkLCjLzNWD_bGAU",
    authDomain: "instagram-clone-react-55b5d.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-55b5d.firebaseio.com",
    projectId: "instagram-clone-react-55b5d",
    storageBucket: "instagram-clone-react-55b5d.appspot.com",
    messagingSenderId: "447540797095",
    appId: "1:447540797095:web:03bc9dab1ff2222d6d0582"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const firestore = firebaseApp.firestore()
const storage = firebaseApp.storage()

const auth = firebaseApp.auth()

export {firestore, storage, auth}
  
