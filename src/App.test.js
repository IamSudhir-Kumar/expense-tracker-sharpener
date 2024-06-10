import { render, screen } from "@testing-library/react"
import App from "./App"
//10 test cases are added.
test("renders welcome message", () => {
  render(<App />)
  const welcomeElement = screen.getByText(/Welcome to Expense Tracker/i)
  expect(welcomeElement).toBeInTheDocument()
})

test("renders profile link in navigation", () => {
  render(<App />)
  const profileLink = screen.getByText(/Profile/i)
  expect(profileLink).toBeInTheDocument()
})

test("renders expenses link in navigation", () => {
  render(<App />)
  const expensesLink = screen.getByText(/Expenses/i)
  expect(expensesLink).toBeInTheDocument()
})

test("renders about us link in navigation", () => {
  render(<App />)
  const aboutUsLink = screen.getByText(/About Us/i)
  expect(aboutUsLink).toBeInTheDocument()
})

test('renders "Verify Email" button in Home component', () => {
  render(<App />)
  const verifyEmailButton = screen.getByText(/Verify Email/i)
  expect(verifyEmailButton).toBeInTheDocument()
})

test('renders "Active Premium" button when premium option is available', () => {
  render(<App />)
  const activePremiumButton = screen.getByText(/Active Premium/i)
  expect(activePremiumButton).toBeInTheDocument()
})

test('renders "Logout" button when user is logged in', () => {
  render(<App />)
  const logoutButton = screen.getByText(/Logout/i)
  expect(logoutButton).toBeInTheDocument()
})

test('renders "Update" button in ProfileData component', () => {
  render(<App />)
  const updateButton = screen.getByText(/Update/i)
  expect(updateButton).toBeInTheDocument()
})

test('renders "Cancel" button in ProfileData component', () => {
  render(<App />)
  const cancelButton = screen.getByText(/Cancel/i)
  expect(cancelButton).toBeInTheDocument()
})

test('renders "Complete Now!" link in Home component for incomplete profile', () => {
  render(<App />)
  const completeProfileLink = screen.getByText(/Complete Now!/i)
  expect(completeProfileLink).toBeInTheDocument()
})
