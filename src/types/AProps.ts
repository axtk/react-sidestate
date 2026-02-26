import type { AnchorHTMLAttributes } from "react";
import type { EnhanceHref } from "./EnhanceHref.ts";
import { LinkNavigationProps } from "./LinkNavigationProps.ts";

export type AProps = EnhanceHref<AnchorHTMLAttributes<HTMLAnchorElement>> &
  LinkNavigationProps;
