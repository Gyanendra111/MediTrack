import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase.js'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const assertFirebaseEnabled = () => {
    if (!auth || !db) {
      throw new Error('Firebase is not configured. Set VITE_FIREBASE_* environment variables.')
    }
  }

  const login = (email, password) => {
    assertFirebaseEnabled()
    return signInWithEmailAndPassword(auth, email, password)
  }

  const register = async (email, password) => {
    assertFirebaseEnabled()
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Add user doc
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      inventory: [],
      credits: 0,
      points: 0
    })
    return userCredential
  }
  const forgotPassword = (email) => {
    assertFirebaseEnabled()
    return sendPasswordResetEmail(auth, email)
  }
  const logout = () => {
    if (!auth) return Promise.resolve()
    return signOut(auth)
  }

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return undefined
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = { user, login, register, forgotPassword, logout, loading }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Initializing Auth...</div> : children}
    </AuthContext.Provider>
  )
}
