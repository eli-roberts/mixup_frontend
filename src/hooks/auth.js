// import { useState } from 'react'

// const auth = () => {
//   const [authorized, setAuthorized] = useState(false)

//   const isAuthenticated = () => 
//     authorized || localStorage.getItem("auth_token") !== null
  

//   const register = registerData => {
//     return fetch("http://127.0.0.1:8000",{
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(registerData)
//     })
//       .then(response = response.json())
//       .then(response => {
//       if("token" in response) {
//         localStorage.setItem("auth_token", response.token)
//         setAuthorized(true)
//       }
//     })
//   }

//   const login = credentials => {
//     return fetch("http://127.0.0.1:8000", {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(credentials)
//     })
//     .then(response => response.json())
//     .then(response => {
//       if ('valid' in response && response.valid && "token" in response) {
//         localStorage.setItem("auth_token", response.token)
//         setAuthorized(true)
//       }
//     })
//   }

//   const logout = () => {
//     setAuthorized(false)
//     localStorage.removeItem("auth_token")
//   }


//   return { isAuthenticated, register, login, logout }
// }

// export default auth