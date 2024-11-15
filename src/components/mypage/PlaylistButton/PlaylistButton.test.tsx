import EditIcon from "@mui/icons-material/Edit";
import { render, screen } from "@testing-library/react";
import PlaylistButton from "./PlaylistButton";

describe("PlaylistButtonコンポーネントの単体テスト", () => {
  const mockSetFunc = jest.fn();
  test("受け取ったPropsを反映し、レンダリングされること", () => {
    render(
      <PlaylistButton
        name="テスト"
        icon={<EditIcon data-testid="icon-element" />}
        setFunc={mockSetFunc}
      />,
    );
    expect(screen.getByRole("button", { name: "テスト" })).toBeInTheDocument();
    expect(screen.getByTestId("icon-element")).toBeInTheDocument();
  });
});
