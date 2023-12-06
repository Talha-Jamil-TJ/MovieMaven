import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MediaType } from '@shared/enums/media-type.enum';
import { removeFalsyValues } from '@shared/helpers/remove-falsy-values.helper';
import { IMediaSearchForm, IMediaSearchFormValue } from '@shared/interfaces/media-list.form.interface';
import { MediaListQuery } from '@store/media-list/media-list.query';
import { MediaListService } from '@store/media-list/media-list.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-media-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
  ],
  templateUrl: './media-form.component.html',
  styleUrl: './media-form.component.scss',
})
export class MediaFormComponent implements OnInit {
  form!: FormGroup<IMediaSearchForm>;

  mediaTypes = [MediaType.Movie, MediaType.Episode, MediaType.Series];
  isLoading = this._query.isLoading;
  yearControl = new FormControl<Record<string, any> | null>(null);
  @ViewChild('picker', { static: false }) private picker!: MatDatepicker<Date>;

  constructor(
    private _service: MediaListService,
    private _query: MediaListQuery,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._subscribeToYearControlChanges();
  }

  chosenYearHandler(moment: Record<string, any>) {
    this.yearControl.patchValue(moment);

    this.picker.close();
  }

  clearTypeSelection() {
    this.form.controls.type.reset();
  }

  async onSearch() {
    if (this.form.invalid) return;

    this._service.setIsFormSubmitted(true);

    const value = removeFalsyValues(this.form.value as IMediaSearchFormValue);

    await this._service.updateFilter(value);
  }

  private _initForm() {
    this.form = new FormGroup<IMediaSearchForm>({
      s: new FormControl<string | null>('', Validators.required),
      type: new FormControl<MediaType | null>(null),
      y: new FormControl(null),
    });
  }

  private _subscribeToYearControlChanges() {
    this.yearControl.valueChanges.subscribe((moment) => {
      this.form.patchValue({ y: moment?.['_i']?.year ?? null });
    });
  }
}
