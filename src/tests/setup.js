import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// added this such that motion/react can work in jsdom
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// added this such that motion/react can work in jsdom
globalThis.IntersectionObserver = MockIntersectionObserver;

afterEach(() => {
  cleanup();
});
