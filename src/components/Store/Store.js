import { configureStore, createSlice } from "@reduxjs/toolkit"

const user_info = JSON.parse(localStorage.getItem("user")) || {}
const initialAuthState = {
  isLoggedIn: user_info.isLoggedIn || false,
  idToken: user_info.idToken || "",
  isProfileComplete: false,
  isVerified: false,
}
console.log(initialAuthState, "ias")
const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setIdToken: (state, action) => {
      state.idToken = action.payload
    },
    setVerified: (state, action) => {
      state.isVerified = action.payload
    },
    setProfileComplete: (state, action) => {
      state.isProfileComplete = action.payload
    },
  },
})
export const authActions = authSlice.actions

const expensesInitialState = {
  expenses: [],
  updateExpenses: true,
  premiumOption: false,
  activePremium: false,
}
const expensesSlice = createSlice({
  name: "expensesSlice",
  initialState: expensesInitialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload
    },
    updateExpenses: (state, action) => {
      state.updateExpenses = !state.updateExpenses
    },
    setPremiumOption: (state, action) => {
      state.premiumOption = action.payload
    },
    setActivePremium: (state, action) => {
      state.activePremium = action.payload
    },
  },
})
const themeSlice = createSlice({
  name: "themeSlice",
  initialState: {
    darkMode: true,
  },
  reducers: {
    setTheme: (state) => {
      state.darkMode = !state.darkMode
    },
  },
})
export const themeActions = themeSlice.actions

const Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expenses: expensesSlice.reducer,
    themeReducer: themeSlice.reducer,
  },
})
const getStore = Store.getState()
console.log("store", getStore)
export const expensesActions = expensesSlice.actions
export default Store
