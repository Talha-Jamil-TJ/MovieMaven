import { FormControl } from '@angular/forms';
import { MediaPlot } from '../enums/media-plot.enum';
import { MediaType } from '../enums/media-type.enum';

export type IMediaDetailFormValue = {
  type: MediaType;
  plot: MediaPlot;
  y: number;
} & ({ t: string } | { i: string });

export interface IMediaDetailForm {
  type: FormControl<MediaType | null>;
  plot: FormControl<MediaPlot | null>;
  y: FormControl<number | null>;
  t?: FormControl<string | null>;
  i?: FormControl<string | null>;
}
