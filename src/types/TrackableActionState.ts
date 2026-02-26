export type TrackableActionState = {
  initial?: boolean | undefined;
  pending?: boolean | undefined;
  error?: unknown;
  time?: number | undefined;
};
