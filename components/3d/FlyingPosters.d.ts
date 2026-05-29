import * as React from "react";

export interface FlyingPostersProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: string[];
  planeWidth?: number;
  planeHeight?: number;
  distortion?: number;
  scrollEase?: number;
  cameraFov?: number;
  cameraZ?: number;
  autoScrollSpeed?: number;
  className?: string;
}

declare const FlyingPosters: React.FC<FlyingPostersProps>;
export default FlyingPosters;
