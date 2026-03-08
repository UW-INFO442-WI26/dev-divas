import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Match from "../components/Match";

vi.mock("../AuthContext.jsx", () => ({
	useAuth: () => ({ user: null }),
}));

vi.mock("../firebase.js", () => ({
	database: {},
}));

describe("Match", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	const renderMatch = () => {
		render(
			<MemoryRouter>
				<Match />
			</MemoryRouter>
		);
	};

	it("mock survey input and test if matches are correct", async () => {
		localStorage.setItem(
			"userSurveyData",
			JSON.stringify({
				question1: ["Strong mission"],
				question2: ["High school"],
			})
		);

		renderMatch();

		expect(await screen.findByText(/\(4\/4\)/i)).toBeInTheDocument(); // should get 4 results

		expect(screen.getByText(/Elo High School/i)).toBeInTheDocument();
		expect(screen.getByText(/Almond Academy/i)).toBeInTheDocument();
		expect(screen.getByText(/Illiya Primary School/i)).toBeInTheDocument();
		expect(screen.getByText(/Muhan Primary School/i)).toBeInTheDocument();

		expect(screen.queryByText(/Sanchez Primary School/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Layhay Primary School/i)).not.toBeInTheDocument();
	});

	it("mock situation: if user accepts all matched schools, the matched schools should show up as cards", async () => {
		localStorage.setItem(
			"userSurveyData",
			JSON.stringify({
				question1: ["Strong mission"],
				question2: ["High school"],
			})
		);

		const user = userEvent.setup(); // set up user interaction simulation
		renderMatch();

		await screen.findByText(/\(4\/4\)/i);

		const yesButton = screen.getByRole("button", { name: /accept this school/i });
		await user.click(yesButton);
		await user.click(yesButton);
		await user.click(yesButton);
		await user.click(yesButton);

		expect(
			await screen.findByRole("heading", {
				name: /congratulations! you matched with these schools!/i,
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole("button", {
				name: /view details for matched school: elo high school/i,
			})
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", {
				name: /view details for matched school: almond academy/i,
			})
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", {
				name: /view details for matched school: illiya primary school/i,
			})
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", {
				name: /view details for matched school: muhan primary school/i,
			})
		).toBeInTheDocument();
	});
});
