import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase.js'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const register = async (email, password) => {
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
  const forgotPassword = (email) => sendPasswordResetEmail(auth, email)
  const logout = () => signOut(auth)

  useEffect(() => {
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

