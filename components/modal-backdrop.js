"use client";
import { useRouter } from "next/router";

export default async function ModalBackdrop() {
  const router = useRouter();
  return <div className="modal-backdrop" onClick={router.back} />;
}
