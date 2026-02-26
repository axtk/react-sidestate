import type { AreaHTMLAttributes } from "react";
import type { EnhanceHref } from "./EnhanceHref.ts";
import { LinkNavigationProps } from "./LinkNavigationProps.ts";

export type AreaProps = EnhanceHref<AreaHTMLAttributes<HTMLAreaElement>> &
  LinkNavigationProps;
