import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig={
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: "token-dashboard-b22c6.firebasestorage.app",
    messagingSenderId: "token-dashboard-b22c6.firebasestorage.app",
    appId: "1:729305363549:web:aecded84c2b43f01df09b4",
}

const app= initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

