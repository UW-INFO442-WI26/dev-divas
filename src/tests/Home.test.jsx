import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Home from "../components/Home";

describe("Home", () => {
	const renderHome = () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);
	};

	it('shows the title', () => {
		renderHome();

		expect(
			screen.getByRole("heading", {
				name: /Every classroom\s*deserves all the help it needs\./i,
			})
		).toBeInTheDocument();
	});

	it('shows the "Find Schools" and "Volunteer Now" buttons', () => {
		renderHome();

		expect(screen.getByText(/Find Schools/i)).toBeInTheDocument();
		expect(screen.getByText(/Volunteer Now/i)).toBeInTheDocument();
	});

	it('shows "Our Impact", "Mission", and "Contact Us" sections', () => {
		renderHome();

		expect(screen.getByRole("heading", { name: /Our Impact/i })).toBeInTheDocument();
		expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: /Contact Us/i })).toBeInTheDocument();
	});
});
