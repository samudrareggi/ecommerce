import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../assets/css/ProductListing.css"

export default function LoadingSkeleton(props) {
  return (
      <div className="loading-container">
          {Array(8)
            .fill()
            .map((_, index) => (
              <SkeletonTheme key={"ls" + index}>
                <Skeleton className="loading-item" width={295} height={350} />
              </SkeletonTheme>
            ))}
      </div>
  );
}
