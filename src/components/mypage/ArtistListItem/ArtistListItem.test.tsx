import type { DeezerArtist } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import ArtistListItem from "./ArtistListItem";

const mockArtist: DeezerArtist = {
  id: 111,
  name: "ヒルシカ",
  picture_xl: "example.jpg",
};
describe("ArtistListItemコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<ArtistListItem artist={mockArtist} />);

    expect(
      screen.getByRole("link", {
        name: "ヒルシカのアーティスト画像 ヒルシカ",
      }),
    ).toHaveAttribute("href", "/artist/111");

    expect(screen.getByRole("img", { name: "ヒルシカのアーティスト画像" })).toHaveAttribute(
      "src",
      `${mockArtist.picture_xl}`,
    );
  });
});
