import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBCUjPa4ABJ7e9Il_b54rs9wYW-pC9brC0",
    authDomain: "crwn-clothing-db-a3294.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-a3294-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "crwn-clothing-db-a3294",
    storageBucket: "crwn-clothing-db-a3294.appspot.com",
    messagingSenderId: "251143515377",
    appId: "1:251143515377:web:06951f015b6a62ff748d50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });

        } catch (e) {
            console.log(e);
        }
    }

    return userDocRef;

}