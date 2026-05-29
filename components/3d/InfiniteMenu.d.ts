import * as React from "react";

export interface InfiniteMenuItem {
  image: string;
  link?: string;
  title?: string;
  description?: string;
}

export interface InfiniteMenuProps {
  items?: InfiniteMenuItem[];
  scale?: number;
}

declare const InfiniteMenu: React.FC<InfiniteMenuProps>;
export default InfiniteMenu;
