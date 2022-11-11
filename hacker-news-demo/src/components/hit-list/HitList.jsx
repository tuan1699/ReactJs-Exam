import React from "react";
import { useEffect, useState } from "react";
import Hit, { HitType } from "../hit/Hit";
import styles from "./HitList.module.css";
import PropTypes from "prop-types";

const HitList = ({ hits }) => {
  const [hitsList, setHitsList] = useState(hits);
  const handleDeleteHit = (id) => {
    setHitsList((prev) => {
      const indexOfObject = prev.findIndex((hit) => {
        return hit.objectID === id;
      });
      prev.splice(indexOfObject, 1);
      return [...prev];
    });
  };

  return (
    <div className={styles.list}>
      {hitsList.map((hit) => (
        <Hit key={hit.objectId} hit={hit} handleDeleteHit={handleDeleteHit} />
      ))}
    </div>
  );
};

export const HitListType = {
  hits: PropTypes.arrayOf(HitType),
};

export default HitList;
