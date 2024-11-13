import App from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App Component Test", () => {
  it("タイトルが「学習記録一覧」であること", async () => {
    render(<App />);
    const title = await screen.findByTestId("title");
    expect(title).toHaveTextContent("学習記録一覧");
  });

  it("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されていること", async () => {
    render(<App />);
    const beforeLists = await screen.findAllByRole('listitem');

    await userEvent.type(screen.getByTestId('inputText'), 'テスト記録');
    await userEvent.type(screen.getByTestId('inputTime'), '10');
    await userEvent.click(screen.getByRole('button', {name: '登録'}));

    await waitFor(() => {
      const afterLists = screen.getAllByRole('listitem');
      expect(afterLists).toHaveLength(beforeLists.length + 1);
    });
  });
});