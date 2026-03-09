import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Qualifications from "../components/Qualifications";

// mock user
vi.mock("../AuthContext.jsx", () => ({
  useAuth: () => ({
    user: { uid: "test-user-123" },
    loading: false,
    loginWithGoogle: vi.fn(),
    logout: vi.fn(),
  }),
}));

// mock survey-react-ui
vi.mock("survey-react-ui", () => ({
  Survey: ({ model }) => (
    <button
      data-testid="complete-survey"
      onClick={() => {
        model.data = { question1: "John", question2: "Doe" };
        model.onComplete.fire(model, { data: model.data });
      }}
    >
      Complete Survey
    </button>
  ),
}));

describe("Qualifications Component", () => {
  let setItemSpy; // set item spy to check on localStorage.setItem calls

  beforeEach(() => {
    vi.clearAllMocks();
    setItemSpy = vi.spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the survey component", () => {
    render(
      <Qualifications />
    );

    expect(screen.getByTestId("complete-survey")).toBeInTheDocument();
  });

  it("saves survey data when completed", () => {
    render(
      <Qualifications />
    );

    fireEvent.click(screen.getByTestId("complete-survey"));

    expect(setItemSpy).toHaveBeenCalledWith(
      "profile_test-user-123",
      JSON.stringify({ question1: "John", question2: "Doe" })
    );
  });

});

