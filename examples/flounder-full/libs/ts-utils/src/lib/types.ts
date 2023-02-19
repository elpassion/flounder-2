export type Maybe<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
