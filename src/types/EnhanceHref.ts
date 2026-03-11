import type { LocationValue } from "stateshape";

export type EnhanceHref<T extends { href?: string | undefined }> = Omit<
  T,
  "href"
> & {
  href?: LocationValue;
};
