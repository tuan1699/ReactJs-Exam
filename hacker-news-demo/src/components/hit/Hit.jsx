import React from "react";
import styles from "./Hit.module.css";
import PropTypes from "prop-types";

const Hit = ({ hit, handleDeleteHit }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{hit.title}</div>
      <div className={styles.info}>
        {hit.points} by {hit.author} | {hit.num_comments} comments
      </div>
      <div>
        <a href={hit.url} className={styles.readmore}>
          Readmore
        </a>
        <button
          className={styles.remove}
          onClick={() => handleDeleteHit(hit.objectID)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export const HitType = PropTypes.shape({
  objectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  num_comments: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
});

Hit.propTypes = {
  hit: HitType,
};

export default Hit;
