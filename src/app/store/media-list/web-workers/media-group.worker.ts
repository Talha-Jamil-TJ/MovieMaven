import { groupMoviesByYear } from '@shared/helpers/group-movies-by-year.helper';
import { Media } from '@shared/interfaces/media-list.response.interface';

self.addEventListener('message', ({ data }: MessageEvent<Media[]>) => {
  const res = groupMoviesByYear(data);
  postMessage(res);
});
