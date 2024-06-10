import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "../Store/Store"

import Expenses from "./Expenses"

jest.mock("node-fetch")

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe("Expenses component", () => {
  let store

  beforeEach(() => {
    store = createStore(rootReducer)
  })

  test("renders Expenses component with initial state", () => {
    useSelector.mockReturnValue({
      expenses: [],
      activePremium: false,
    })

    render(
      <Provider store={store}>
        <Expenses />
      </Provider>
    )

    expect(screen.getByText("Current Balance")).toBeInTheDocument()
    expect(screen.getByText("Total Expenses")).toBeInTheDocument()
  })

  test("handles adding an expense", async () => {
    useSelector.mockReturnValue({
      expenses: [],
      activePremium: false,
    })

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({}),
    })

    render(
      <Provider store={store}>
        <Expenses />
      </Provider>
    )

    fireEvent.change(screen.getByLabelText("Money Expense:"), {
      target: { value: "50" },
    })

    fireEvent.change(screen.getByLabelText("Category:"), {
      target: { value: "Food" },
    })

    fireEvent.change(screen.getByLabelText("Description:"), {
      target: { value: "Groceries" },
    })

    fireEvent.click(screen.getByText("Add Expense"))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })
})
