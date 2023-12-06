import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MAT_TOOLTIP_SCROLL_STRATEGY, MatTooltipModule } from '@angular/material/tooltip';
import { scrollStrategyFactory } from '@shared/helpers/scroll-strategy';
import { MediaListQuery } from '@store/media-list/media-list.query';
import { MediaListService } from '@store/media-list/media-list.service';

@Component({
  selector: 'app-media-paginator',
  standalone: true,
  imports: [MatPaginatorModule, MatTooltipModule],
  providers: [
    {
      provide: MAT_TOOLTIP_SCROLL_STRATEGY,
      deps: [Overlay],
      useFactory: scrollStrategyFactory,
    },
  ],
  templateUrl: './media-paginator.component.html',
  styleUrl: './media-paginator.component.scss',
})
export class MediaPaginatorComponent implements OnInit {
  totalItems = this._query.totalItems;
  currentPage = this._query.currentPage;

  constructor(
    private _query: MediaListQuery,
    private _service: MediaListService,
  ) {}

  ngOnInit(): void {}

  async handlePageEvent({ pageIndex }: PageEvent): Promise<void> {
    await this._service.updatePage(pageIndex + 1);
  }
}
