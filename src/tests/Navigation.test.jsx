import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

vi.mock("../AuthContext.jsx", () => ({
  useAuth: () => ({
    user: null,
    logout: vi.fn(),
  }),
}));

describe("Navigation", () => {

  it("shows login link when user is not authenticated", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText(/log in/i)).toBeInTheDocument();
  });

  it("shows main navigation links", () => {
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