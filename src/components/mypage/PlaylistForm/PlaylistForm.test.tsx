import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import PlaylistForm from "./PlaylistForm";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("PlayListFormコンポーネントの単体テスト", () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  test("fieldset要素のアクセシブルネームは、「プレイリスト作成」となっていること", () => {
    render(<PlaylistForm />);
    expect(screen.getByRole("group", {name: "プレイリスト作成"})).toBeInTheDocument();
  });

  test("プレイリストタイトル入力欄", async () => {
    const user = userEvent.setup();
    render(<PlaylistForm />);

    const textbox = screen.getByRole("textbox", { name: "タイトル" });
    const value = "テストコンテンツ";
    await user.type(textbox, value);

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  })

  test("キャンセルボタンを押すとrouter.back()が呼ばれること", async () => {
    const user = userEvent.setup();

    render(<PlaylistForm />);

    await user.click(screen.getByRole("button", {name: "キャンセル"}));

    expect(mockBack).toHaveBeenCalled();
  })

  test("入力欄にテキストを入力し、作成ボタンを押すとrouter.back()が呼ばること", async () => {
    const user = userEvent.setup();

    render(<PlaylistForm />);

    const textbox = screen.getByRole("textbox", { name: "タイトル" });
    const value = "テストコンテンツ";
    await user.type(textbox, value);
    await user.click(screen.getByRole("button", { name: "作成" }));

    expect(mockBack).toHaveBeenCalled();
  })

  test("フォームに空白文字を入力後、作成ボタンを押すと「空白文字だけの入力は無効です」と表示されること", async () => {
    const user = userEvent.setup();

    render(<PlaylistForm />);

    const textbox = screen.getByRole("textbox", { name: "タイトル" });
    const value = " ";
    await waitFor(() => user.type(textbox, value));
    await waitFor(() => user.click(screen.getByRole("button", { name: "作成"})));

    expect(await screen.findByText("空白文字だけの入力は無効です")).toBeInTheDocument();
    expect(mockBack).not.toHaveBeenCalled();
  })

  test("フォームに入力せず、作成ボタンを押すと「プレイリスト名を入力してください」と表示されること", async () => {
    const user = userEvent.setup();

    render(<PlaylistForm />);

    await waitFor(() => user.click(screen.getByRole("button", { name: "作成"})));

    expect(await screen.findByText("プレイリスト名を入力してください")).toBeInTheDocument();
    expect(mockBack).not.toHaveBeenCalled();
  })
});
