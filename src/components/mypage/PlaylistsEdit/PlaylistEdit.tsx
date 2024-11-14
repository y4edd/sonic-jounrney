"use client";

import { fetchUser, getUserPlaylist } from "@/utils/apiFunc";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Playlist } from "@prisma/client";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import styles from "./PlaylistEdit.module.css";
import { TitleChange } from "./TitleChange/TitleChange";

export const PlaylistEdit = ({
  setEditModalOpen,
}: {
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [titleChangeFlag, setTitleChangeFlag] = useState<boolean[]>([]);
  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUser();
      setUser(data.id);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      const getPlaylists = async () => {
        const getPlaylists = await getUserPlaylist(user);
        setPlaylists(getPlaylists);
      };
      getPlaylists();
    }
  }, [user]);

  // プレイリスト名編集のための状態関数を作成
  useEffect(() => {
    setTitleChangeFlag([]);
    for (let i = 1; i <= playlists.length; i++) {
      setTitleChangeFlag((prevState) => [...prevState, false]);
    }
  }, [playlists]);

  const handlePlaylistDelete = async (playlist: Playlist) => {
    const deleteCheck = confirm(`「${playlist.name}」\nプレイリストを削除しますか？`);
    if (deleteCheck) {
      try {
        const res = await fetch("http://localhost:3000/api/deletePlaylist", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: playlist.id,
          }),
        });

        if (!res.ok) {
          throw new Error("正常に削除できませんでした");
        }
        setPlaylists((prevState) =>
          prevState.filter((deletePlaylist) => deletePlaylist !== playlist),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.editTitle}>プレイリスト編集</p>
      <div className={styles.listWrapper}>
        <ul className={styles.playlists}>
          {playlists.map((playlist, index) =>
            titleChangeFlag[index] ? (
              <TitleChange
                key={playlist.id}
                playlist={playlist}
                setTitleChangeFlag={setTitleChangeFlag}
                playlistIndex={index}
              />
            ) : (
              <li key={playlist.id} className={styles.playlistList}>
                <p className={styles.listTitle}>{playlist.name}</p>
                <div className={styles.editIcons}>
                  <button
                    type="button"
                    onClick={() => setTitleChangeFlag(playlists.map((_playlist, i) => index === i))}
                    aria-label="edit"
                  >
                    <EditIcon className={styles.editIcon} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePlaylistDelete(playlist)}
                    aria-label="delete"
                  >
                    <DeleteIcon className={styles.deleteIcon} />
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={() => setEditModalOpen(false)}
          className={styles.closeButton}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};
