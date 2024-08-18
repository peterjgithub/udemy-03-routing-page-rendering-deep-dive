"use client";

import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";
import { useRouter } from "next/navigation";
//path @modal is ignored, so the folder name is @modal/(.)image and not
// @modal/(..)image

export default function ImagePage({ params }) {
  const router = useRouter();

  router.back;

  const newsItemSlug = params.slug;
  const newsItem = DUMMY_NEWS.find(
    (newsItem) => newsItem.slug === newsItemSlug
  );

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
