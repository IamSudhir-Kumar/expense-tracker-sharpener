import React, { useContext, useState } from "react"
import Logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom"
import MyContext from "../Context/MyContext"
import { useSelector, useDispatch } from "react-redux"
import { authActions, expensesActions, themeActions } from "../Store/Store"
import Dark from "../../assets/dark-mode.png"
import Light from "../../assets/light-mode.png"
const Header = () => {
  const context = useContext(MyContext)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const premiumOption = useSelector((state) => state.expenses.premiumOption)
  const darkMode = useSelector((state) => state.themeReducer.darkMode)
  const activePremium = useSelector((state) => state.expenses.activePremium)
  const [themeIcon, setThemeIcon] = useState(Dark)
  const handleLogout = () => {
    localStorage.removeItem("user")
    dispatch(authActions.setLoggedIn(false))
    // context.setIsLoggedIn(false)
  }

  const handleTheme = () => {
    dispatch(themeActions.setTheme())
    console.log(darkMode)
    if (themeIcon === Dark) {
      setThemeIcon(Light)
    } else {
      setThemeIcon(Dark)
    }
  }
  const goPremium = () => {
    dispatch(expensesActions.setActivePremium(true))
  }
  return (
    <div className=" flex justify-between  drop-shadow items-center sticky shadow-black  shadow-md bg-customColor  h-12">
      <img src={Logo} className="  absolute left-8 h-[110%]"></img>
      <h1 className=" absolute left-24 text-customText font-bold text-xl ">
        Expense Tracker
      </h1>
      <nav className=" absolute left-80 ">
        <ul className=" flex items-center font-semibold text-cyan-400 p-3 ">
          <li>
            <NavLink
              to="/"
              exact
              className="pr-10 "
              activeClassName="underline"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses" className=" pr-10" activeClassName="active">
              Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className=" pr-10" activeClassName="active">
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>

      {premiumOption && !activePremium && (
        <button
          onClick={goPremium}
          className=" absolute right-[20%] bg-green-300  px-4 rounded-lg "
        >
          Active Premium
        </button>
      )}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className=" absolute left-[85%] px-5 rounded-md py-1 font-bold  bg-cyan-500"
        >
          Logout
        </button>
      )}
      {activePremium && (
        <img
          onClick={handleTheme}
          src={themeIcon}
          className=" right-0 absolute w-9 transform rotate-3 mr-5 p-[5px] border border-cyan-500 rounded-full"
        ></img>
      )}
    </div>
  )
}

export default Header
