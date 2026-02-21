import { useState } from 'react'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { clsx, type ClassValue } from 'clsx'

function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function AuthButton() {
  const { user, signIn, logout, loading } = useAuth()
  const { t } = useLanguage()
  const [showDropdown, setShowDropdown] = useState(false)

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-stone-200 animate-pulse" />
    )
  }

  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={cn(
            "flex items-center gap-2 p-2 rounded-full",
            "bg-white/80 backdrop-blur-sm shadow-sm",
            "hover:bg-white hover:shadow-md",
            "transition-all duration-200"
          )}
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-stone-300 flex items-center justify-center">
              <User className="w-4 h-4 text-stone-600" />
            </div>
          )}
          <ChevronDown className="w-4 h-4 text-stone-600" />
        </button>

        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 py-2 z-20">
              <div className="px-4 py-2 border-b border-stone-100">
                <p className="text-sm font-medium text-stone-800 truncate">
                  {user.displayName || 'User'}
                </p>
                <p className="text-xs text-stone-500 truncate">
                  {user.email}
                </p>
              </div>
              <button
                onClick={() => {
                  logout()
                  setShowDropdown(false)
                }}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm",
                  "text-stone-700 hover:bg-stone-50",
                  "flex items-center gap-2"
                )}
              >
                <LogOut className="w-4 h-4" />
                {t.logout || t.logoutFallback}
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={signIn}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-white/80 backdrop-blur-sm shadow-sm",
        "hover:bg-white hover:shadow-md",
        "text-sm font-medium text-stone-700",
        "transition-all duration-200"
      )}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      {t.signIn || t.signInFallback}
    </button>
  )
}
