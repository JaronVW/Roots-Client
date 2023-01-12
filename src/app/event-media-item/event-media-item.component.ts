import { Component, OnInit, Input, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-event-media-item',
  template: ` <h2>{{ media }}</h2>
    <div *ngIf="isImage; else loggedOut">
      <img src="{{ imageUrl }}" class="img-fluid img-size" alt="{{ media }}" />
    </div>

    <ng-template #loggedOut>
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
  @Input() media!: string;

  getFile() {
    this.document.location.href = `http://localhost:3000/file/${this.path}?originalFilename=${this.media}`;
  }

  isImage(): boolean {
    return (
      this.path.includes('jpg') ||
      this.path.includes('png') ||
      this.path.includes('jpeg') ||
      this.path.includes('gif') ||
      this.path.includes('svg')
    );
  }
}
