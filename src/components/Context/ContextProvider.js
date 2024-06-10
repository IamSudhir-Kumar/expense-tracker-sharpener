import React, { useContext, useEffect, useState } from "react"
import MyContext from "./MyContext"

const ContextProvider = (props) => {
  const user_info = JSON.parse(localStorage.getItem("user")) || {}
  console.log(user_info.idToken)
  const [expenses, setExpenses] = useState([])
  const [idToken, setIdToken] = useState(user_info.idToken || "")
  const [isLoggedIn, setIsLoggedIn] = useState(user_info.isLoggedIn || false)
  const [trigger, setTrigger] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(
    user_info.isProfileComplete || true
  )

  // useEffect(() => {
  //   fetch(
  //     "https://expense-tracker-178b6-default-rtdb.firebaseio.com/expenses.json"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!data) {
  //         return setExpenses([])
  //       }
  //       const expensesArray = Object.keys(data).map((item) => data[item])
  //       console.log(expensesArray, "ea")
  //       setExpenses(expensesArray)
  //     })
  // }, [trigger])

  const [isVerified, setIsVerified] = useState(false)
  const [email, setEmail] = useState("")
  console.log("isver ", isVerified)
  // useEffect(() => {
  //   const obj = {
  //     idToken: idToken,
  //     isVerified: isVerified,
  //     isProfileComplete: isProfileComplete,
  //     isLoggedIn: isLoggedIn,
  //   }

  //   localStorage.setItem("user", JSON.stringify(obj))
  // }, [idToken, isVerified, isProfileComplete, isLoggedIn])
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     fetch(
  //       "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAray5G5GdSNqIx_WRwfps8LT3Ou-mNTUw",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           idToken: idToken,
  //         }),
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.users && data.users.length > 0) {
  //           const user = data.users[0]
  //           console.log(user)
  //           if (user.displayName) {
  //             console.log("profile already completed")
  //             setIsProfileComplete(true)
  //           } else {
  //             console.log("Display Name is not set")
  //             setIsProfileComplete(false)
  //           }
  //         } else {
  //           console.log("User not found")
  //           setIsProfileComplete(false)
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error)
  //       })
  //   }
  //   fetch(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAray5G5GdSNqIx_WRwfps8LT3Ou-mNTUw",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         idToken: idToken,
  //       }),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.users && data.users.length > 0) {
  //         const user = data.users[0]

  //         if (user.emailVerified) {
  //           setIsVerified(true)
  //           console.log("e_v")
  //         } else {
  //           setIsVerified(false)
  //         }
  //       } else {
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error)
  //     })
  // }, [isLoggedIn, idToken])

  const value = {
    idToken,
    setIdToken,
    setIsLoggedIn,
    isLoggedIn,
    isProfileComplete,
    setIsProfileComplete,
    isVerified,
    setIsVerified,
    email,
    setEmail,
    setExpenses,
    expenses,
    setTrigger,
  }
  return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
}

export default ContextProvider
