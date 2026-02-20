import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth, signInWithGoogle, logoutUser } from '../lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: () => Promise<User>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = useCallback(async (): Promise<User> => {
    try {
      const user = await signInWithGoogle()
      setUser(user)
      return user
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutUser()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
