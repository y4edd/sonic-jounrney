import { UseHamburgerOpen } from "@/hooks/header/useHamburgerOpen";
import { fireEvent, render, screen } from "@testing-library/react";
import { HamburgerMenu } from "./HamburgerMenu";
import "@testing-library/jest-dom";
import { useLogout } from "@/hooks/useLogout";

jest.mock("@/hooks/header/useHamburgerOpen", () => ({
  UseHamburgerOpen: jest.fn(),
}));

jest.mock("@/hooks/useLogout", () => ({
  useLogout: jest.fn(),
}));

jest.mock("next/image", () => {
  return (props: {
    src: string;
    alt: string;
    height: number;
    width: number;
  }) => {
    return <img {...props} alt={props.alt} />;
  };
});

describe("ハンバーガーメニューの単体テスト", () => {
  const mockHandleMenuClick = jest.fn();
  const mockHandleLinkClick = jest.fn();
  const mockLogoutUser = jest.fn().mockResolvedValue(undefined);
  beforeEach(() => {
    (UseHamburgerOpen as jest.Mock).mockReturnValue({
      openMenu: false,
      openMenuClick: mockHandleMenuClick,
      hamburgerLink: mockHandleLinkClick,
    });
    (useLogout as jest.Mock).mockReturnValue({
      logoutUser: mockLogoutUser,
      serverError: "",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("メニューアイコンをクリックするとハンバーガーメニューが開く", () => {
    render(<HamburgerMenu />);

    expect(screen.queryByText("トップページ")).toBeNull();

    const menuIcon = screen.getByTestId("hamburger-menu");
    fireEvent.click(menuIcon);

    expect(mockHandleMenuClick).toHaveBeenCalled();

    (UseHamburgerOpen as jest.Mock).mockReturnValue({
      openMenu: true,
      openMenuClick: mockHandleMenuClick,
      hamburgerLink: mockHandleLinkClick,
    });

    render(<HamburgerMenu />);

    expect(screen.getByText("トップページ")).toBeInTheDocument();
  });
  test("ハンバーガーメニューに各ページへの遷移リンクが表示されている", () => {
    (UseHamburgerOpen as jest.Mock).mockReturnValue({
      openMenu: true,
      openMenuClick: mockHandleMenuClick,
      hamburgerLink: mockHandleLinkClick,
    });

    render(<HamburgerMenu />);

    expect(screen.getByText("トップページ")).toBeInTheDocument();
    expect(screen.getByText("マイページ")).toBeInTheDocument();
    expect(screen.getByText("プレイリスト")).toBeInTheDocument();
    expect(screen.getByText("お気に入りアーティスト")).toBeInTheDocument();
    expect(screen.getByText("お気に入り楽曲")).toBeInTheDocument();
    expect(screen.getByText("再生履歴")).toBeInTheDocument();
    expect(screen.getByText("ユーザー")).toBeInTheDocument();
  });
  test("☒ボタンをクリックするとハンバーガーメニューが非表示になる", () => {
    (UseHamburgerOpen as jest.Mock).mockReturnValue({
      openMenu: true,
      openMenuClick: mockHandleMenuClick,
      hamburgerLink: mockHandleLinkClick,
    });

    render(<HamburgerMenu />);
    expect(screen.getByText("トップページ")).toBeInTheDocument();

    const closeMenuIcon = screen.getByTestId("close-hamburger-menu");
    fireEvent.click(closeMenuIcon);

    (UseHamburgerOpen as jest.Mock).mockReturnValue({
      openMenu: false,
      openMenuClick: mockHandleMenuClick,
      hamburgerLink: mockHandleLinkClick,
    });

    render(<HamburgerMenu />);
    expect(screen.queryByText("トップページ")).toBeInTheDocument();
  });
});
