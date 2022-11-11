import qs from "qs";

export const getNews = (query) => {
  const queryParam = qs.stringify(query);

  console.log(query);
  console.log(queryParam);

  return fetch(`${import.meta.env.VITE_NEWS_API}?${queryParam}`)
    .then((res) => res.json())
    .then((data) => data);
};
