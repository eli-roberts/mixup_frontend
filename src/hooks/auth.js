import { useState } from "react"

const useSimpleAuth = () => {

    const [loggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = () =>
        loggedIn || localStorage.getItem("auth_token") !== null

    const register = userInfo => {
        return fetch("http://127.0.0.1:8000/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(response => response.json())
            .then(response => {
                if ("token" in response) {
                    localStorage.setItem("auth_token", response.token)
                    setIsLoggedIn(true)
                }
            })
    }

    const login = credentials => {
        return fetch("http://127.0.0.1:8000/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(response => response.json())
            .then(response => {
                if ("valid" in response && response.valid && "token" in response) {
                    localStorage.setItem("auth_token", response.token)
                    setIsLoggedIn(true)
                }
            })
    }

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("auth_token")
    }

    return { isAuthenticated, logout, login, register }
}

export default useSimpleAuth