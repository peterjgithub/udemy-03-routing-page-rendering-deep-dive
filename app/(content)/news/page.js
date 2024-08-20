// the best way to get all news is to use the getAllNews function from the news library
// this way you can get the news from a database that we own in the project
// this is the best way to get the news

import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
