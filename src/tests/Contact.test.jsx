import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "../Contact";

describe("Contact Component", () => {

  it("renders contact page title and subtitle", () => {
    render(<Contact />);

    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Need further assistance, have any questions, or just want to leave feedback/i
      )
    ).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<Contact />);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThanOrEqual(3); 
  });

  it("renders send button", () => {
    render(<Contact />);

    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("updates first name input when typing", () => {
    render(<Contact />);

    const firstNameInput = screen.getAllByRole("textbox")[0];
    fireEvent.change(firstNameInput, { target: { value: "John" } });

    expect(firstNameInput.value).toBe("John");
  });

  it("updates email input when typing", () => {
    render(<Contact />);

    const inputs = screen.getAllByRole("textbox");
    const emailInput = inputs[2];

    fireEvent.change(emailInput, { target: { value: "john@email.com" } });

    expect(emailInput.value).toBe("john@email.com");
  });

  it("updates message textarea when typing", () => {
    render(<Contact />);

    const messageInput = screen.getByRole("textbox", { name: "" });

    fireEvent.change(messageInput, { target: { value: "Hello there!" } });

    expect(messageInput.value).toBe("Hello there!");
  });

}); 