import { FormControl } from '@angular/forms';
import { MediaType } from '../enums/media-type.enum';

export interface IMediaSearchFormValue {
  type: MediaType;
  page: number;
  s: string;
  y: number;
}

export interface IMediaSearchForm {
  s: FormControl<string | null>;
  type: FormControl<MediaType | null>;
  y: FormControl<number | null>;
}
