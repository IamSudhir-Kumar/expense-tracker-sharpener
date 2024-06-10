import React, { useState, useContext } from "react"
import BgImage from "../../assets/bgimg.jpg"
import MyContext from "../Context/MyContext"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../Store/Store"

const SignUpPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const idToken = useSelector((state) => state.auth.idToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const context = useContext(MyContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showLogInPage, setShowLogInPage] = useState(false)
  const [forgetPassword, setForgetPassword] = useState(false)

  const forgetPasswordHandler = () => {
    setForgetPassword(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (forgetPassword) {
      try {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDb7u0nyGXK2wBGsP5br7jaOs0Vs-3Jfnc",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: email,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => console.log(data))
      } catch (error) {
        console.log(error.message)
      }
    }

    if (showLogInPage && !forgetPassword) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDb7u0nyGXK2wBGsP5br7jaOs0Vs-3Jfnc",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Error : ${response.statusText}`)
        }

        const data = await response.json()
        console.log("you are logged in", data)
        dispatch(authActions.setIdToken(data.idToken))
        console.log("after dis")
        // context.setIdToken(data.idToken)
        dispatch(authActions.setLoggedIn({ tode: true }))
        // context.setIsLoggedIn(true)
        context.setEmail(data.email)
        navigate("/")
      } catch (error) {
        alert(error.message)
      }
    } else if (!showLogInPage && !forgetPassword) {
      if (password === confirmPassword) {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDb7u0nyGXK2wBGsP5br7jaOs0Vs-3Jfnc",
            {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
          }

          console.log("User successfully signed up!")
          setShowLogInPage(true)
        } catch (error) {
          alert(error.message)
        }
      } else {
        alert("Passwords do not match!")
      }
    }
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen pt-[6%]  flex   justify-center  font-sans"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className=" bg-customColor mt-11 lg:mt-3 h-[20%] lg:w-[30%] w-[80%] p-5 rounded-md">
        <h2 className="text-2xl text-center  text-white font-bold mb-4">
          {showLogInPage ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-2">
            <label htmlFor="email" className="block text-white mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1 rounded-md border"
              required
            />
          </div>
          {!forgetPassword && (
            <div className="mb-2">
              <label htmlFor="password" className="block text-white mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1 rounded-md border"
                required
              />
            </div>
          )}

          {!showLogInPage && (
            <div className="mb-2 ">
              <label
                htmlFor="confirmPassword"
                className="block text-white mb-2"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-1 rounded-md border"
                required
              />
            </div>
          )}
          {showLogInPage && (
            <p
              onClick={forgetPasswordHandler}
              className="cursor-pointer underline text-red-100 hover:underline"
            >
              Forgotten Password?
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-800 font-bold self-center mt-4  text-white px-14 text-lg py-2 rounded-md"
          >
            {forgetPassword
              ? "Send Link"
              : showLogInPage
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>
        <button
          onClick={() => {
            setShowLogInPage((prev) => {
              setForgetPassword(false)
              return !prev
            })
          }}
          className=" bg-cyan-600   text-white w-full mt-3  p-2 rounded-md text-center"
        >
          {!showLogInPage ? "Have an account? Login!" : "New User? Sign Up!"}
        </button>
      </div>
    </div>
  )
}

export default SignUpPage
