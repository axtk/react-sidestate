import { LocationValue } from "sidestate";

export type EnhanceHref<T extends { href?: string | undefined }> = Omit<
  T,
  "href"
> & {
  href?: LocationValue;
};
