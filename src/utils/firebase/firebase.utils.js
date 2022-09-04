import {initializeApp} from "firebase/app"
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth"
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDV0pXrWu9CeqFLoZ8CPWg4pfHo5yiv_r8",
    authDomain: "crwn-clothing-db-138e7.firebaseapp.com",
    projectId: "crwn-clothing-db-138e7",
    storageBucket: "crwn-clothing-db-138e7.appspot.com",
    messagingSenderId: "90493399092",
    appId: "1:90493399092:web:983ee0cf3892a4db18da61"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    // if user data does not exist
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log("Error creating the user", error.message)
        }
    }
    return userDocRef;
}