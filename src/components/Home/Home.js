import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MyContext from "../Context/MyContext"
import HomeBG from "../../assets/homebg.png"
import { useSelector, useDispatch } from "react-redux"
import { authActions } from "../Store/Store"

const Home = () => {
  const idToken = useSelector((state) => state.auth.idToken)
  const authState = useSelector((state) => state.auth)
  const context = useContext(MyContext)
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.themeReducer.darkMode)
  const verifyEmail = async () => {
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDb7u0nyGXK2wBGsP5br7jaOs0Vs-3Jfnc",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: idToken,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDb7u0nyGXK2wBGsP5br7jaOs0Vs-3Jfnc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: idToken,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.users && data.users.length > 0) {
          const user = data.users[0]

          if (user.displayName) {
            dispatch(authActions.setVerified(true))
            // context.setIsVerified(true)
            console.log("uservarified")
          } else {
            dispatch(authActions.setVerified(false))
            // context.setIsVerified(false)
            console.log("falsed")
          }
        } else {
          console.log("notuservarified")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }
  const getBG = () => {
    if (darkMode) {
      return "bg-customBg"
    } else {
      return "bg-green-200 "
    }
  }

  return (
    <div
      className={`p-3 bg-cover h-screen justify-center bg-customBg ${getBG()}`}
    >
      <div className="max-w-md mx-auto bg-cyan-950  flex flex-col rounded-md overflow-hidden shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4 text-stone-200">
          Welcome to Expense Tracker
        </h1>
        {!authState.isProfileComplete && (
          <div>
            <p className="text-gray-700 rounded-md italic bg-red-200 p-1 px-2 w-fit mb-4">
              Your profile is incomplete!
            </p>
            <Link to="/complete-profile" className=" underline text-blue-300">
              Complete Now!
            </Link>
          </div>
        )}
        {!authState.isVerified && (
          <button
            onClick={verifyEmail}
            className=" bg-cyan-600 rounded-md text-white w-fit self-end px-3 py-1 "
          >
            Verify Email
          </button>
        )}
      </div>
    </div>
  )
}

export default Home