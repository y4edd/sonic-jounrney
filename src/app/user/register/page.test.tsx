import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UserRegistration from "./page";

// モックの設定
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// userRegister、onSubmit、serverErrorをモック化
const mockOnRegister = jest.fn((data) => {
  return Promise.resolve({ success: true });
});

const mockOnSubmit = jest.fn((data) => {
  mockOnRegister(data);
});

jest.mock("@/hooks/useRegister", () => ({
  userRegister: jest.fn(() => ({
    RegisterUser: mockOnRegister,
    onSubmit: mockOnSubmit,
    serverError: "",
  })),
}));

describe("UserRegistrationコンポーネントのテスト", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setUp = () => {
    render(<UserRegistration />);
    const submitButton = screen.getByRole("button", { name: "ユーザー登録" });
    return { submitButton };
  };

  test("フォームが正しくレンダリングされている", () => {
    render(<UserRegistration />);
    expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード確認")).toBeInTheDocument();
  });

  test("必須フィールドが空の場合、エラーメッセージが表示される", async () => {
    const { submitButton } = setUp();
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("ユーザー名は必須です", { collapseWhitespace: true }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("正しいメールアドレスを入力してください", {
          collapseWhitespace: true,
        }),
      ).toBeInTheDocument();

      const errorMessages = screen.getAllByText("パスワードは6文字以上で入力してください");
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  test("必須フィールドに正常に入力が行われ、ボタンをクリックするとデータが送信されresponseが返ってくる", async () => {
    const { submitButton } = setUp();

    // 入力箇所の取得
    const userNameInput = screen.getByLabelText("ユーザー名");
    const emailInput = screen.getByLabelText("メールアドレス");
    const passwordInput = screen.getByLabelText("パスワード");
    const passwordConfirmInput = screen.getByLabelText("パスワード確認");

    // 入力
    fireEvent.change(userNameInput, { target: { value: "testMan" } });
    fireEvent.change(emailInput, { target: { value: "testMan@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    // ボタンクリック
    fireEvent.click(submitButton);

    // RegisterUser の呼び出し確認
    await waitFor(() => {
      expect(mockOnRegister).toHaveBeenCalledTimes(1);
      expect(mockOnRegister).toHaveBeenCalledWith({
        name: "testMan",
        email: "testMan@test.com",
        password: "password",
      });
    });

    // 呼び出し履歴の詳細をログに出力
    console.log(mockOnRegister.mock.calls);
  });
});
