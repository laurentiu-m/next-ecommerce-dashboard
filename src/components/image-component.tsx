"use client";

import { useState } from "react";
import Image from "next/image";
import { SkeletonImage } from "./skeletons";

type Props = {
  src: string;
  title: string;
  width: string;
  height: string;
};

export const ImageComponent = ({ src, title, width, height }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ width: width, height: height }} className="relative">
      {!isLoaded && <SkeletonImage />}

      <Image
        src={src}
        alt={title}
        fill
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        loading="eager"
      />
    </div>
  );
};
