import { Media } from '../interfaces/media-list.response.interface';

export const groupMoviesByYear = (mediaArr: Media[]) =>
  mediaArr?.reduce(
    (group, search) => ({
      ...group,
      [search.Year]: [search, ...(group?.[search.Year] ?? [])],
    }),
    {} as Record<string, Media[]>,
  ) ?? {};
