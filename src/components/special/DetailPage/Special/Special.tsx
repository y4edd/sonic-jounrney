import styles from "./Special.module.css";
import type { SpecialOverView } from "@/types/deezer";
import type { SpecialSongs } from "@/types/deezer";
import type { DeezerTrackSong } from "@/types/deezer";
import { SpecialHeader } from "../SpecialHeader/SpecialHeader";
import { SpecialTitles } from "../SpecialTitles/SpecialTitles";

const getSpecialImage = async () => {
  const response = await fetch("http://localhost:3000/api/getSpecialImage", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("特集ページの情報の取得に失敗しました");
  }
  const specialOverViews: SpecialOverView[] = await response.json();
  return specialOverViews;
};

const getSpecialSongs = async (id: number) => {
  const response = await fetch(
    `http://localhost:3000/api/getSpecialSongs?id=${id}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("特集ページのプレイリストの情報の取得に失敗しました");
  }
  const specialSongs: SpecialSongs[] = await response.json();
  return specialSongs;
};

const getSpecialSongInfo = async (id: number) => {
  const playlistSongs = await getSpecialSongs(id);
  const response = await fetch(`http://localhost:3000/api/getSpecialSongInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ songs: playlistSongs }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("APIエラー:", response.status, errorText);
    throw new Error("特集ページのプレイリスト曲の情報の取得に失敗しました");
  }
  const playlistSongInfo: DeezerTrackSong[] = await response.json();
  return playlistSongInfo;
};

export const Special = async ({ id }: { id: number }) => {
  const specialOverViews = await getSpecialImage();
  const specialOverView = specialOverViews[id - 1];
  const specialPlaylistInfo = await getSpecialSongInfo(id);
  return (
    <>
      <SpecialHeader specialOverView={specialOverView} />
      <div className={styles.specialBody}>
        <SpecialTitles specialOverView={specialOverView} />
        {/* <SpecialPlaylist specialOverView={specialOverView} /> */}
        {specialPlaylistInfo.map((info, index) => (
          <div key={index}>
            {/* <p>{info.title}</p>
            <p>{info.id}</p>
            <p>{info.preview}</p>
            <p>{info.artist.id}</p>
            <p>{info.artist.name}</p>
            <p>{info.album.id}</p>
            <p>{info.album.title}</p> */}
            <p>{info.album.cover_xl}</p>
          </div>
        ))}
      </div>
    </>
  );
};
