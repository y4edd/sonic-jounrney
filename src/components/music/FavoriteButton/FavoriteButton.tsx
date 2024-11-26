"use client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DoneIcon from '@mui/icons-material/Done';
import styles from "./FavoriteButton.module.css";
import { useEffect, useState } from "react";
import { fetchUser, getFavoriteSongsForFav } from "@/utils/apiFunc";

//FIXME: 使いまわせるように（mypage/favoritesong/page.tsxでも使われておりました） 
type favoriteSong = {
  songId: number;
  updatedAt: Date;
};

const FavoriteButton = ({ id }: { id: number }) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  // NOTE: DBから取得したお気に入り楽曲とidを比較し、お気に入りボタンの表示を変える
  const doneFav= async () => {
    // NOTE: ログイン状態を確認し、userIdを返す
    const userId:string = await fetchUser();
    // NOTE: DBからお気に入り楽曲を取得。
    const favoriteSongs = await getFavoriteSongsForFav(userId);
    console.log(favoriteSongs);
  };


  useEffect(()=> {
    doneFav();
  }, []);

  // お気に入り楽曲追加
  const postFavorite = async () => {
    try {
      const response = await fetch("/api/favoriteSongs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          musicId: id,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        alert(error.message);
        return;
      }

      alert("お気に入り楽曲に追加されました");
      setIsFav(true);
    } catch (error) {
      console.error(error);
      alert("ネットワークエラーです");
    }
  };

  // お気に入り楽曲削除
  const deleteFavorite = async () => {
    try {
      const response = await fetch("/api/favoriteSongs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songIds: [id],
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        alert(error.message);
        return;
      }

      alert("お気に入り楽曲から削除されました");
      setIsFav(false);
    } catch (error) {
      console.error(error);
      alert("ネットワークエラーです");
    }
  };

  return (
    <>
      {isFav ? (
        <>
          <button type="button" className={styles.songInfoAddedFavorite} onClick={deleteFavorite}>
            <DoneIcon />
            お気に入りに追加済み
          </button>
        </>
      )
        : (
          <>
            <button type="button" className={styles.songInfoAddFavorite} onClick={postFavorite}>
              <FavoriteBorderIcon />
              お気に入りに追加
            </button>
          </>
        )
      }
    </>
  );
};

export default FavoriteButton;
