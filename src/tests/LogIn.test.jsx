import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LogIn from "./LogIn";

// mock AuthContext
jest.mock("../AuthContext.jsx", () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from "../AuthContext.jsx";

describe("LogIn Page", () => {

  test("shows Google login button when user is not logged in", () => {
    useAuth.mockReturnValue({
      user: null,
      loginWithGoogle: jest.fn(),
      logout: jest.fn(),
    });

    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue with google/i })
    ).toBeInTheDocument();
  });

  test("shows user info when logged in", () => {
    useAuth.mockReturnValue({
      user: {
        displayName: "Jane Doe",
        email: "jane@email.com",
      },
      loginWithGoogle: jest.fn(),
      logout: jest.fn(),
    });

    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    );

    expect(screen.getByText(/you're signed in/i)).toBeInTheDocument();
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign out/i })
    ).toBeInTheDocument();
  });

});
