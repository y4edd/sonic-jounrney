import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./page";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Loginコンポーネントのテスト", () => {
  test("フォームが正しくレンダリングされている", () => {
    render(<Login />);
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
  });

  test("必須フィールドが空の場合、エラーメッセージが表示される", async () => {
    render(<Login />);
    fireEvent.submit(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(
        screen.getByText("正しいメールアドレスを入力してください", {
          collapseWhitespace: true,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("パスワードは6文字以上で入力してください", {
          collapseWhitespace: true,
        }),
      ).toBeInTheDocument();
    });
  });

  test("パスワードやメールアドレスが要件を満たさない場合、エラーメッセージが表示される", async () => {
    render(<Login />);

    fireEvent.input(screen.getByLabelText("メールアドレス"), {
      target: { value: "tani" },
    });
    fireEvent.input(screen.getByLabelText("パスワード"), {
      target: { value: "passw" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(screen.getByText("正しいメールアドレスを入力してください")).toBeInTheDocument();
      expect(screen.getByText("パスワードは6文字以上で入力してください")).toBeInTheDocument();
    });
  });
});
