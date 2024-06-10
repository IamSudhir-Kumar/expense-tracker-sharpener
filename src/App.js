import React, { useContext, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import SignUpPage from "./components/Authentication/SignUpPage"
import Home from "./components/Home/Home"
import ContextProvider from "./components/Context/ContextProvider"
import ProfileData from "./components/Home/ProfileData"
import MyContext from "./components/Context/MyContext"
import Expenses from "./components/Expenses/Expenses"
import { useSelector, useDispatch } from "react-redux"
import { authActions, expensesActions } from "./components/Store/Store"

function App() {
  const context = useContext(MyContext)
  const authState = useSelector((state) => state.auth)
  const expensesState = useSelector((state) => state.expenses)
  const dispatch = useDispatch()
  useEffect(() => {
    fetch(
      "https://expense-tracker-178b6-default-rtdb.firebaseio.com/expenses.json"
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          return dispatch(expensesActions.setExpenses([]))
          // return setExpenses([])
        }
        const expensesArray = Object.keys(data).map((item) => data[item])
        console.log(expensesArray, "ea")
        dispatch(expensesActions.setExpenses(expensesArray))
        // setExpenses(expensesArray)
      })
  }, [expensesState.updateExpenses])
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(authState))
  }, [
    authState.idToken,
    authState.isVerified,
    authState.isProfileComplete,
    authState.isLoggedIn,
  ])
  useEffect(() => {
    if (authState.isLoggedIn) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDb7u0nyGXK2wBGsP5br7jaOs0Vs-3Jfnc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: authState.idToken,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.users && data.users.length > 0) {
            const user = data.users[0]
            console.log(user)
            if (user.displayName) {
              console.log("profile already completed")
              // setIsProfileComplete(true)
              dispatch(authActions.setProfileComplete(true))
            } else {
              console.log("Display Name is not set")
              // setIsProfileComplete(false)
              dispatch(authActions.setProfileComplete(false))
            }
          } else {
            console.log("User not found")
            // setIsProfileComplete(false)
            dispatch(authActions.setProfileComplete(false))
          }
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDb7u0nyGXK2wBGsP5br7jaOs0Vs-3Jfnc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: authState.idToken,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.users && data.users.length > 0) {
          const user = data.users[0]

          if (user.emailVerified) {
            // setIsVerified(true)
            dispatch(authActions.setVerified(true))
            console.log("e_v")
          } else {
            // setIsVerified(false)
            dispatch(authActions.setVerified(false))
          }
        } else {
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }, [authState.isLoggedIn, authState.idToken])

  return (
    <div>
      <div className="">
        <Header />

        <Routes>
          <Route
            path="/"
            element={authState.isLoggedIn ? <Home /> : <SignUpPage />}
          />
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route
            path="/complete-profile"
            element={<ProfileData></ProfileData>}
          ></Route>
          <Route
            path="/expenses"
            element={authState.isLoggedIn ? <Expenses /> : <SignUpPage />}
          ></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
