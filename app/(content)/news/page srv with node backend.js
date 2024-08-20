// import { DUMMY_NEWS } from "@/dummy-news";
// disabled as we have a backend (=db simulation)

// this code assumes there is a backend server running on localhost:8080
// in the other example we will move the db directly in ou rnextjs app
// so we will be able to directly call the db from the client side

import NewsList from "@/components/news-list";

export default async function NewsPage() {
  const response = await fetch("http://localhost:8080/news");
  // fetch is a node-fetch function
  // nextjs is extending the fetch function to work on the server side

  if (!response.ok) {
    throw new Error("Failed to fetch the news.");
  }

  const news = await response.json();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
