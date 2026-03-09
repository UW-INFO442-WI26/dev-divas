import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

jest.mock("../AuthContext.jsx", () => ({
  useAuth: () => ({
    user: null,
    logout: jest.fn(),
  }),
}));

describe("Navigation", () => {
  test("shows login link when user is not authenticated", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText(/log in/i)).toBeInTheDocument();
  });

  test("shows main navigation links", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/find schools/i)).toBeInTheDocument();
    expect(screen.getByText(/volunteer now/i)).toBeInTheDocument();
  });
});