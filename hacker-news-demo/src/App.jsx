import { useEffect, useState } from "react";
import HitList from "./components/hit-list/HitList";
import Loading from "./components/loading/Loading";
import Search from "./components/search/Search";
import styles from "./App.module.css";
import { useGetNews } from "./useGetNews";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const { hits, page, totalPage, nextPage, prevPage, loading } =
    useGetNews(searchValue);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Search Hacker News</h1>
      <div className="row">
        <div className="col-12">
          <Search handleSearch={handleSearch} />
        </div>
      </div>
      <div className={styles.controlField}>
        <button onClick={prevPage} className={styles.control}>
          Prev
        </button>
        {page} of {totalPage}
        <button onClick={nextPage} className={styles.control}>
          Next
        </button>
      </div>
      {loading ? <Loading /> : <HitList hits={hits} />}
    </div>
  );
}

export default App;
