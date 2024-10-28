import styles from "./SpecialPlaylist.module.css";
import type { DeezerTrackSong } from "@/types/deezer";
import PickSong from "../PlayPickSong/PickSong/PickSong";

export const SpecialPlaylist = ({
  specialPlaylistInfo,
}: {
  specialPlaylistInfo: DeezerTrackSong[];
}) => {
  return (
    <div className={styles.albumPageContent}>
      <div className={styles.albumDetailContent}>
        <div className={styles.albumSongsContent}>
          <PickSong singles={specialPlaylistInfo} />
        </div>
      </div>
    </div>
  );
};
