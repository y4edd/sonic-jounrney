import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./page";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Loginコンポーネントのテスト", () => {
  it("フォームが正しくレンダリングされている", () => {
    render(<Login />);
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
  });

  it("必須フィールドが空の場合、エラーメッセージが表示される", async () => {
    render(<Login />);
    fireEvent.submit(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(
        screen.getByText("正しいメールアドレスを入力してください", { collapseWhitespace: true }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("6文字以上で入力してください", {
          collapseWhitespace: true,
        }),
      ).toBeInTheDocument();
    });
  });

  it("パスワードやメールアドレスが一致しない場合、エラーメッセージが表示される", async () => {
    render(<Login />);

    fireEvent.input(screen.getByLabelText("メールアドレス"), {
      target: { value: "tani" },
    });
    fireEvent.input(screen.getByLabelText("パスワード"), {
      target: { value: "pass" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(screen.getByText("6文字以上で入力してください")).toBeInTheDocument();
      expect(screen.getByText("6文字以上で入力してください")).toBeInTheDocument();
    });
  });

  // 未実装ですが、テストコードだけ書きました
  // it("正しい入力の場合、ページ遷移が行われる", async () => {
  //   render(<Login />);

  //   fireEvent.input(screen.getByLabelText("ユーザー名"), {
  //     target: { value: "tanitune" },
  //   });
  //   fireEvent.input(screen.getByLabelText("パスワード"), {
  //     target: { value: "password" },
  //   });

  //   fireEvent.submit(screen.getByRole("button", { name: "ログイン" }));

  //   await waitFor(() => {
  //     expect(mockPush).toHaveBeenCalledWith("/top");
  //   });
  // });
});
