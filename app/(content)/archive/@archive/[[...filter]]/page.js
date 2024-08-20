// this is a catch-all route,
// so it will match any URL that hasn't been matched by a more specific route before
// and pass the matched parts of the URL as a parameter to the page component.
import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";

//note: this could be a separate component
async function FilterHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();
  let links = availableYears;

  if (
    (year && !availableYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))
    //remove the + sign - it converts the string to a number
  ) {
    throw new Error("Invalid filter");
  }
  // +selectedYear converts year string to number

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = []; // don't show links for months
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

//note: this could be a separate component
async function FilteredNews({ year, month }) {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for the selected period</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
}

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter;
  // console.log(filter);

  // const selectedYear = filter ? filter[0] : null; // shorter in next line
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      <Suspense
        fallback={<p>Loading filter...Will be back after a suspense...</p>}
      >
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>

      <Suspense
        fallback={<p>Loading news...Will be back after a suspense... </p>}
      >
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
      {/* suspense shows a loading message while the data is being fetched //for
      a component (not for the entire page) */}
    </>
  );
  // const news = getNewsForYear(newsYear);

  // return <NewsList news={news} />;
}
