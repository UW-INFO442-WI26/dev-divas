import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FindSchool from "../components/FindSchool";
import { dummySchools } from "../components/Match";

describe("FindSchool route", () => {
  it("shows at least one school card with image, name, location, values, and preferred level at Find School page", () => {
    const firstSchool = dummySchools[0];

    render(
      <FindSchool />
    );

    expect(screen.getByRole("heading", { name: /Schools That Need You/i })).toBeInTheDocument();

    const cards = screen.getAllByRole("button", { name: /View details for/i });
    expect(cards.length).toBeGreaterThan(0);

    const firstCard = cards[0];
    const inCard = within(firstCard);

    expect(inCard.getByRole("img", { name: /school campus in/i })).toBeInTheDocument();
    expect(inCard.getByRole("heading", { name: firstSchool.Name })).toBeInTheDocument();
    expect(inCard.getByText(firstSchool.Location)).toBeInTheDocument();
    expect(inCard.getByText(/Preferred level:/i)).toBeInTheDocument();

    const values = firstSchool.Values.split(",").map((value) => value.trim());
    values.forEach((value) => {
      expect(inCard.getByText(value)).toBeInTheDocument();
    });
  });
});
