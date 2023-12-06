import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, OnInit, Signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { IInfoState } from '@shared/interfaces/info-state.interface';
import { MediaListQuery } from '@store/media-list/media-list.query';
import { MediaFormComponent } from './children/media-form/media-form.component';
import { MediaPaginatorComponent } from './children/media-paginator/media-paginator.component';

import { MediaTableComponent } from './children/media-table/media-table.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MediaTableComponent,
    MediaFormComponent,
    NgTemplateOutlet,
    MatCardModule,
    MatExpansionModule,
    MediaPaginatorComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @ViewChild(MediaFormComponent) formComponent!: MediaFormComponent;

  mediaYears = this._query.mediaYears;
  isLoading = this._query.isLoading;
  error = this._query.error;
  isFormSubmitted = this._query.isFormSubmitted;

  infoState!: Signal<IInfoState | null>;

  constructor(private _query: MediaListQuery) {}

  ngOnInit() {
    this._setInfoState();
  }

  private _setInfoState() {
    this.infoState = computed(() => {
      if (this.isLoading()) {
        return {
          title: 'Results Loading',
          description:
            "Hang tight! We're whispering to the server. It's a bit of a chatterbox, so give us a moment to hear back!",
        };
      } else if (!this.isFormSubmitted()) {
        return {
          title: 'Please fill the form',
          description:
            'This form is as blank as a canvas in an art gallery. How about we add a splash of your info to make it a masterpiece?',
        };
      } else if (this.error()) {
        return {
          title: 'Oh No! our systems have reported the following error',
          description: this.error(),
        };
      } else if (!this.mediaYears()?.length) {
        return {
          title: 'No Results Found',
          description:
            "Well, it looks like our data went on a coffee break. Let's try again once it's back from its little escape!",
        };
      }

      return null;
    });
  }
}
