"use client";

import { useRouter } from "next/navigation";
import React from "react";

function BackButton() {
  const router = useRouter();
  return (
    <button
      className="absolute top-4 left-8 flex text-sm"
      onClick={() => router.back()}
    >
      {/* <ArrowLeftIcon className="h-5 w-5" /> */}
      <span>Back</span>
    </button>
  );
}

export default BackButton;
