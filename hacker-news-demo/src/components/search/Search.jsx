import styles from "./Search.module.css";

const Search = ({ handleSearch }) => {
  return (
    <div className="input-group flex-nowrap">
      <input
        type="text"
        className={styles.input}
        placeholder="Search ..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
