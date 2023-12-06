import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { MediaDetailSearch } from '@shared/enums/media-detail-search.enum';
import { MediaPlot } from '@shared/enums/media-plot.enum';
import { MediaType } from '@shared/enums/media-type.enum';
import { removeFalsyValues } from '@shared/helpers/remove-falsy-values.helper';
import {
  IMediaDetailForm,
  IMediaDetailFormValue,
} from '@shared/interfaces/media-detail.form.interface';
import { MediaDetailQuery } from '@store/media-detail/media-detail.query';
import { MediaDetailService } from '@store/media-detail/media-detail.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    JsonPipe,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  form!: FormGroup<IMediaDetailForm>;
  searchTermSwitchControl!: FormControl<MediaDetailSearch | null>;
  titleAndId = [MediaDetailSearch.ID, MediaDetailSearch.Title];

  isLoading = this._query.isLoading;

  detailEntries = this._query.detailEntries;

  constructor(
    private _query: MediaDetailQuery,
    private _service: MediaDetailService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._subscribeToRouterSnapshot();
  }

  onSearchTermToggle({ value }: MatButtonToggleChange): void {
    if (value === MediaDetailSearch.ID) {
      this._initIdControl();
    } else {
      this._initTitleControl();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    const value = removeFalsyValues(this.form.value as IMediaDetailFormValue);

    await this._service.getDetail(value);
  }

  private _initForm(): void {
    this.form = new FormGroup<IMediaDetailForm>({
      t: new FormControl<string>('', Validators.required),
      type: new FormControl<MediaType | null>(null),
      plot: new FormControl<MediaPlot | null>(null),
      y: new FormControl<number | null>(null),
    });

    this.searchTermSwitchControl = new FormControl<MediaDetailSearch>(
      MediaDetailSearch.Title,
    );
  }

  private _initTitleControl(): void {
    if (this.form.controls.i) {
      this.form.removeControl('i');
    }
    this.form.addControl(
      't',
      new FormControl<string | null>(null, Validators.required),
    );
  }

  private _initIdControl(value = null): void {
    if (this.form.controls.t) {
      this.form.removeControl('t');
    }
    this.form.addControl(
      'i',
      new FormControl<string | null>(value, Validators.required),
    );
  }

  private async _subscribeToRouterSnapshot(): Promise<void> {
    const id = this._route.snapshot.params?.['id'];

    if (!id) {
      return;
    }

    this.searchTermSwitchControl.patchValue(MediaDetailSearch.ID);

    this._initIdControl(id);

    await this.onSubmit();
  }
}
