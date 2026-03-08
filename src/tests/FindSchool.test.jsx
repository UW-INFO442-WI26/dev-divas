import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import FindSchool from "../components/FindSchool";
import { dummySchools } from "../components/Match";

describe("FindSchool route", () => {
  it("shows at least one school card with image, name, location, values, and preferred level at Find School page", () => {
    const firstSchool = dummySchools[0];

    render(
      <MemoryRouter initialEntries={["/find-school"]}>
        <Routes>
          <Route path="/find-school" element={<FindSchool />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /Schools That Need You/i })).toBeInTheDocument();

    const cards = screen.getAllByRole("button", { name: /View details for/i });
    expect(cards.length).toBeGreaterThan(0);

    const firstCard = cards[0];
    const cardScope = within(firstCard);

    expect(cardScope.getByRole("img", { name: /school campus in/i })).toBeInTheDocument();
    expect(cardScope.getByRole("heading", { name: firstSchool.Name })).toBeInTheDocument();
    expect(cardScope.getByText(firstSchool.Location)).toBeInTheDocument();
    expect(cardScope.getByText(/Preferred level:/i)).toBeInTheDocument();

    const values = firstSchool.Values.split(",").map((value) => value.trim());
    values.forEach((value) => {
      expect(cardScope.getByText(value)).toBeInTheDocument();
    });
  });
});
