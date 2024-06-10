import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "../Store/Store"
import Home from "./Home"

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}))

describe("Home component", () => {
  let store

  beforeEach(() => {
    store = createStore(rootReducer)
  })

  test("renders Welcome message", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(screen.getByText("Welcome to Expense Tracker")).toBeInTheDocument()
  })

  test("displays profile completion message and link when profile is incomplete", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(screen.getByText("Your profile is incomplete!")).toBeInTheDocument()
    expect(screen.getByText("Complete Now!")).toBeInTheDocument()
  })

  test("does not display profile completion message and link when profile is complete", () => {
    store.dispatch(authActions.setProfileComplete(true))

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(
      screen.queryByText("Your profile is incomplete!")
    ).not.toBeInTheDocument()
    expect(screen.queryByText("Complete Now!")).not.toBeInTheDocument()
  })

  test("calls verifyEmail function when 'Verify Email' button is clicked", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    const verifyEmailButton = screen.getByText("Verify Email")
    fireEvent.click(verifyEmailButton)

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({}),
    })

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })
})
