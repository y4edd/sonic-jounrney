"use client";

import { useFreeWordSearch } from "@/hooks/top/useFreeWordSearch";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HamburgerMenu } from "./HamburgerMenu";
import styles from "./Header.module.css";
import { PageHeadingList } from "./PageHeadingList";

const Header = () => {
  const [searchOn, setSearchOn] = useState(false);
  const { handleForm, handleChange, error, freeWord } = useFreeWordSearch();
  const handleClickSearch = () => {
    setSearchOn((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          {searchOn ? (
            <div className={styles.headerTop}>
              <form onSubmit={handleForm} className={styles.freeSearch}>
                <input
                  type="text"
                  name="freeWord"
                  value={freeWord}
                  onChange={handleChange}
                  placeholder={error ? error : "アーティスト・アルバム・楽曲で検索"}
                />
                <button type="submit">
                  <SearchIcon />
                </button>
              </form>
              <div className={styles.searchCancel}>
                <p
                  className={styles.searchCancelText}
                  onClick={handleClickSearch}
                  onKeyDown={handleClickSearch}
                >
                  キャンセル
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.headerTop}>
              <HamburgerMenu />
              <div className={styles.logoImage}>
                <Link href="/">
                  <Image
                    src="/images/yaetunes_logo_transparent.png"
                    alt="header-logo"
                    height={40}
                    width={160}
                  />
                </Link>
              </div>
              <div
                className={styles.searchIcon}
                onClick={handleClickSearch}
                onKeyDown={handleClickSearch}
                data-testid="search-icon"
              >
                <SearchIcon className={styles.searchIconMark} />
              </div>
            </div>
          )}
        </div>
        <hr />
        <PageHeadingList />
        <hr />
      </div>
    </>
  );
};

export default Header;
