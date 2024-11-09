import App from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react";

describe("Title Test", () => {
  it("タイトルが「学習記録一覧」であること", async () => {
    render(<App />);
    // loading画面の表示が終わるまで待機
    await waitFor(() => {
      expect(screen.getByTestId("title")).toBeInTheDocument();
    });
    // タイトルの取得
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("学習記録一覧");
  });
});