import axios from "axios";
import dayjs from "dayjs";
import lf from 'localforage'

const db = lf.createInstance({
  name: 'refinder'
})


const searchAPI = axios.create({
  baseURL: "https://hn.algolia.com/api/v1",
});

export type SearchResult = {
  hits: Array<{
    created_at: string;
    title: string;
    author: string;
    objectID: string;
    points: number;
    url: string;
  }>;
};

export async function getToday(tag: string) {
  // const cached = await db.getItem<SearchResult["hits"]>(["getToday", tag].join(','));

  let results = [] as SearchResult["hits"];

  for await (let index of [1, 2, 3]) {
    const lastYearOfTodayBegin = dayjs().subtract(index, "year").startOf("day");
    const lastYearOfTodayEnd = dayjs().subtract(index, "year").endOf("day");

    const res = await searchAPI.get<SearchResult>(`/search`, {
      params: {
        hitsPerPage: 3,
        tags: [tag].join(","),
        numericFilters: [
          `created_at_i<${lastYearOfTodayEnd.unix()}`,
          `created_at_i>${lastYearOfTodayBegin.unix()}`,
        ].join(","),
      },
    });

    results = [...results, ...res.data.hits];

    // await db.setItem<SearchResult["hits"]>("getToday", results);
  }

  return results;
}


export type Item = {
  id: number,
  created_at: string,
  author: string,
  title: string,
  url: string,
  points: number,
  children: Array<Item>
}
export async function getItem(id: string) {
  const res = await searchAPI.get<Item>(`items/${id}`);

  return res.data
}

export async function searchByUrl(url: string) {
  const res = await searchAPI.get<SearchResult>(`/search`, {
    params: {
      query: url,
      restrictSearchableAttributes: 'url'
    },
  });

  return res.data.hits
}