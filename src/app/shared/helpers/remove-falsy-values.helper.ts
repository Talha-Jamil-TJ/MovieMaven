export const removeFalsyValues = <T extends object>(obj: T): Partial<T> => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== false && value)) as Partial<T>;
};
