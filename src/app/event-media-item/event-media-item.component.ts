import { Component, OnInit, Input, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-event-media-item',
  template: ` <h2>{{ media }}</h2>
    <img *ngIf="isImage(); else downloadFile" src="{{ imageUrl }}" class="img-fluid img-size" alt="{{ media }}" />
    <img />

    <ng-template #downloadFile>
      <button class="btn btn-primary brand-button" (click)="getFile()">Download</button></ng-template
    >`,
  styles: ['.img-size { max-height: 10rem;  }'],
})
export class EventMediaItemComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  imageUrl: string = '';

  ngOnInit(): void {
    if (this.path || this.media) {
      this.imageUrl = `${environment.apiUrl}file/${this.path}?originalFilename=${this.media}`;
    }
  }

  @Input() path!: string;
  @Input() media: string = '';

  getFile() {
    if (this.path || this.media) {
      this.document.location.href = `http://localhost:3000/file/${this.path}?originalFilename=${this.media}`;
    }
  }

  isImage(): boolean {
    return (
      this.media.includes('jpg') ||
      this.media.includes('png') ||
      this.media.includes('jpeg') ||
      this.media.includes('gif') ||
      this.media.includes('svg')
    );
  }
}
