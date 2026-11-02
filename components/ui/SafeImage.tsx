"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export default function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={props.alt}
        className="absolute inset-0 bg-linear-to-br from-brand to-ink"
      />
    );
  }
  return <Image {...props} onError={() => setFailed(true)} />;
}
