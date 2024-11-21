import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import SongAudio from "../SongAudio/SongAudio";
import styles from "./SongInfoContent.module.css";
import prisma from "@/lib/prisma";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

type SongInfoContentProps = {
  id: number;
  title: string;
  artist: string;
  image: string;
  preview?: string;
};


const SongInfoContent = ({ id, title, artist, image, preview }: SongInfoContentProps) => {

  return (
    <div>
      <div className={styles.songInfoContent}>
        <Image src={image} alt={`${title}のジャケット`} width={130} height={130} priority />
        <div className={styles.songInfoDetail}>
          <h2>{title}</h2>
          <p>{artist}</p>
          <div>
            <SongAudio preview={preview} id={id} />
          </div>
          {/* FIXME: プレイリストに追加する処理を記述する必要があります。 */}
          <div className={styles.songInfoAddFavorite}>
            <FavoriteBorderIcon />
            <FavoriteButton text="お気に入りに追加" />
            {/* <p action={postFavorite}>お気に入りに追加</p> */}
          </div>
          <div className={styles.songInfoAddList}>
            <CreateNewFolderIcon />
            <p>プレイリストに追加</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongInfoContent;
