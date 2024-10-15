import ContentTitle from "@/components/top/ContentTitle/ContentTitle";
import FreeSearch from "@/components/top/FreeSearch/FreeSearch";
import Slider from "@/components/top/Slider/Slider";
import SongsGroup from "@/components/top/SongsGroup/SongsGroup";
import styles from "./page.module.css";

const TopPage = () => {
  return (
    <main>
      <div>
        <div className={styles.specialContent}>
          <ContentTitle title="特集" />
          <Slider />
        </div>

        <div className={styles.freeSearchContent}>
          <FreeSearch />
        </div>

        <div className={styles.newSongsContent}>
          <ContentTitle title="人気新着" />
          <SongsGroup />
        </div>
      </div>
    </main>
  );
};

export default TopPage;
