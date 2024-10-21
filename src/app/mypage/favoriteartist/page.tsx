import ArtistList from "@/components/mypage/ArtistList/ArtistList";
import EditButton from "@/components/mypage/EditButton/EditButton";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import SortButtons from "@/components/mypage/SortButtons/SortButtons";
import BreadList from "@/components/top/BreadList/BreadList";
import { getArtist } from "@/utils/apiFunc";

const FavoriteArtist = async () => {
  // FIXME: ログインユーザーidを取得する
  // FIXME: ログインユーザーのお気に入りアーティストをDBから取得する

  // MEMO: 表示確認のため、仮でアーティストidの配列を定義する
  const favoriteArtistsId = [109785742, 4726033, 5482289, 1460437, 4993784];

  const favoriteArtistsInfo = await Promise.all(
    favoriteArtistsId.map(async (artistId) => {
      const artistData = await getArtist(artistId);

      return artistData.resArtistData;
    }),
  );

  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/favoriteartist", title: "お気に入りアーティスト" },
        ]}
      />
      <MenuHeader title="お気に入りアーティスト" />
      <SortButtons label="登録日" />
      <EditButton />
      <ArtistList artists={favoriteArtistsInfo} />
    </div>
  );
};

export default FavoriteArtist;
