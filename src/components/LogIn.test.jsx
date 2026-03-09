import { render, screen } from "@testing-library/react";
import LogIn from "../LogIn";

describe("LogIn Component", () => {

  it("renders the sign in title", () => {
    render(<LogIn />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders name input field", () => {
    render(<LogIn />);
    const nameInput = screen.getByPlaceholderText("Your Name");
    expect(nameInput).toBeInTheDocument();
  });

  it("renders email input field", () => {
    render(<LogIn />);
    const emailInput = screen.getByPlaceholderText("Your Email");
    expect(emailInput).toBeInTheDocument();
  });

  it("renders password input field", () => {
    render(<LogIn />);
    const passwordInput = screen.getByPlaceholderText("Your Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("renders sign in button", () => {
    render(<LogIn />);
    const button = screen.getByRole("button", { name: /sign in/i });
    expect(button).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<LogIn />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

});
