import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import LogIn from "../components/LogIn";

// mock AuthContext
vi.mock("../AuthContext.jsx", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../AuthContext.jsx";

describe("LogIn Page", () => {

  it("shows Google login button when user is not logged in", () => {
    useAuth.mockReturnValue({
      user: null,
      loginWithGoogle: vi.fn(),
      logout: vi.fn(),
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

  it("shows user info when logged in", () => {
    useAuth.mockReturnValue({
      user: {
        displayName: "Jane Doe",
        email: "jane@email.com",
      },
      loginWithGoogle: vi.fn(),
      logout: vi.fn(),
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

