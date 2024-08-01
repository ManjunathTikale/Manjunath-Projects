import React, { createContext, useEffect, useState } from 'react'

// Create context
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = (loggedInUser) => {
        console.log({loggedInUser})
        localStorage.setItem("user", JSON.stringify(loggedInUser))
        setUser(loggedInUser)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user, 
                login, 
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
