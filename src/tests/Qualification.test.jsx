import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Qualifications from "../Qualifications";

// mock alert
global.alert = vi.fn();

// mock survey-react-ui
vi.mock("survey-react-ui", () => ({
  Survey: ({ model }) => (
    <button
      data-testid="complete-survey"
      onClick={() =>
        model.onComplete.fire(model, {
          data: { question1: "John", question2: "Doe" }
        })
      }
    >
      Complete Survey
    </button>
  ),
}));

describe("Qualifications Component", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the survey component", () => {
    render(<Qualifications />);

    expect(screen.getByTestId("complete-survey")).toBeInTheDocument();
  });

  it("triggers survey completion", () => {
    render(<Qualifications />);

    fireEvent.click(screen.getByTestId("complete-survey"));

    expect(global.alert).toHaveBeenCalled();
  });

  it("alerts survey results when completed", () => {
    render(<Qualifications />);

    fireEvent.click(screen.getByTestId("complete-survey"));

    expect(global.alert).toHaveBeenCalledWith(
      JSON.stringify({ question1: "John", question2: "Doe" })
    );
  });

});

