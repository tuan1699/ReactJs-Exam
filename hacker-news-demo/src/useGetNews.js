import { useEffect, useState } from "react";
import { getNews } from "./services/news.services";

export const useGetNews = (query = "") => {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getNews({ query, page }).then(({ hits, nbPages }) => {
      setTotalPage(nbPages);
      setHits(hits);
      setLoading(false);
    });
  }, [query, page, getNews]);

  useEffect(() => {
    setPage(0);
  }, [query]);

  const nextPage = () => {
    if (page === totalPage - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page === 0) {
      setPage(totalPage - 1);
    } else {
      setPage(page - 1);
    }
  };

  return { hits, page, totalPage, nextPage, prevPage, loading };
};
