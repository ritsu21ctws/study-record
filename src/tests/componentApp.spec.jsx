import App from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react";

describe("Title Test", () => {
  it("タイトルが「学習記録一覧」であること", async () => {
    render(<App />);
    const title = await screen.findByTestId("title");
    expect(title).toHaveTextContent("学習記録一覧");
  });
});