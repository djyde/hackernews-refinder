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
  const cached = await db.getItem<SearchResult['hits']>('getToday')

  if (!cached) {
    let results = [] as SearchResult["hits"];

    for await (let index of [1, 2, 3]) {
      const lastYearOfTodayBegin = dayjs()
        .subtract(index, "year")
        .startOf("day");
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

      await db.setItem<SearchResult["hits"]>("getToday", results);
    }
  }

  return await db.getItem<SearchResult["hits"]>("getToday");
}
