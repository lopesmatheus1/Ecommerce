import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBSYtDlOg4GpTOogs9lwrxaIJRteRaTHEE',
  authDomain: 'club-ecommerce-2-b5bed.firebaseapp.com',
  projectId: 'club-ecommerce-2-b5bed',
  storageBucket: 'club-ecommerce-2-b5bed.firebasestorage.app',
  messagingSenderId: '534457342980',
  appId: '1:534457342980:web:f588683093d95442622951',
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
