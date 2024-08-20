import Link from "next/link";

export default function NewsList(props) {
  console.log("LOG TEST");
  const news = props.news;

  // Check if news is an array
  if (!Array.isArray(news)) {
    return <p>No news available</p>;
  }

  return (
    <ul className="news-list">
      {news.map((newsItem) => (
        <li key={newsItem.id}>
          <Link href={`/news/${newsItem.slug}`}>
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
            <span>{newsItem.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
