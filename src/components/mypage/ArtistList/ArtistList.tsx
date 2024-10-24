import type { DeezerArtist } from "@/types/deezer";
import ArtistListItem from "../ArtistListItem/ArtistListItem";
import styles from "./ArtistList.module.css";

const ArtistList = ({
  artists,
  errorMessage,
}: {
  artists: DeezerArtist[];
  errorMessage: string;
}) => {
  return (
    <div className={styles.artistList}>
      {artists.length === 0 ? (
        <p className={styles.noArtistMessage}>{errorMessage}</p>
      ) : (
        <ul>
          {artists.map((artist: DeezerArtist) => {
            return (
              <li key={artist.id}>
                <ArtistListItem artist={artist} />
              </li>
            );
          })}
          <div className={styles.horizon} />
        </ul>
      )}
    </div>
  );
};

export default ArtistList;
