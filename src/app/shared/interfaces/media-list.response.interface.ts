import { MediaType } from '../enums/media-type.enum';

export interface IMediaListResponse {
  Search?: Media[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface Media {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MediaType;
  Poster: string;
}
