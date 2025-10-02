import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig={
    apiKey: "AIzaSyD8Ki6ybO4QxjOOAJN1i7mWvxeEcrlo8V0",
    authDomain: "token-dashboard-b22c6.firebaseapp.com",
    projectId: "token-dashboard-b22c6",
    storageBucket: "token-dashboard-b22c6.firebasestorage.app",
    messagingSenderId: "token-dashboard-b22c6.firebasestorage.app",
    appId: "1:729305363549:web:aecded84c2b43f01df09b4",
}

const app= initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

