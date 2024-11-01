import ActionButton from "@/components/mypage/ActionButton/ActionButton";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import SongList from "@/components/mypage/SongList/SongList";
import SortButtons from "@/components/mypage/SortButtons/SortButtons";
import BreadList from "@/components/top/BreadList/BreadList";
import { getSong } from "@/utils/apiFunc";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./page.module.css";

const FavoriteSongs = async () => {
  // FIXME: ログインユーザーidを取得する
  // FIXME: ログインユーザーのお気に入り曲をDBから取得する

  // MEMO: 表示確認のため、仮で曲idの配列を定義する
  const favoriteSongsId = [2122792287, 467267512, 1117825182, 2121510947, 2326140975];

  const favoriteSongsInfo = await Promise.all(
    favoriteSongsId.map(async (songId) => {
      const songData = await getSong(songId);
      return songData.resSongData;
    }),
  );

  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/favoritesong", title: "お気に入り楽曲" },
        ]}
      />
      <MenuHeader title="お気に入り楽曲" />
      <SortButtons label="登録日" />
      <div className={styles.actionButtonContainer}>
        <ActionButton name="編集" icon={<EditIcon />} url="/mypage/favoritesong/edit" />
      </div>
      <SongList
        songs={favoriteSongsInfo}
        url="music"
        errorMessage="お気に入り曲は登録されていません"
      />
    </div>
  );
};

export default FavoriteSongs;
