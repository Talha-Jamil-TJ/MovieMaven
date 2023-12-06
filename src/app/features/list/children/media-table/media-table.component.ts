import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Media } from '@shared/interfaces/media-list.response.interface';
import { MediaListQuery } from '@store/media-list/media-list.query';

@Component({
  selector: 'app-media-table',
  standalone: true,
  imports: [NgForOf, NgIf, MatTableModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './media-table.component.html',
  styleUrl: './media-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaTableComponent implements OnInit {
  @Input() year!: string;

  columns = ['Poster', 'Title', 'Year', 'Type', 'ID', 'Action'];

  data!: Signal<Media[]>;

  constructor(private _query: MediaListQuery) {}

  ngOnInit(): void {
    this.data = this._query.mediaFromYear(this.year);
  }
}
