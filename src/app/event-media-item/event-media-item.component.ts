import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-event-media-item',
  template: ` <h2>{{ path }}</h2>
    <div *ngIf="isImage; else loggedOut">
      <img src="{{ imageUrl }}" class="img-fluid img-size" alt="{{ path }}" />
    </div>

    <ng-template #loggedOut><div>bruh</div></ng-template>`,
  styles: ['.img-size { max-height: 10rem;  }'],
})
export class EventMediaItemComponent implements OnInit {
  imageUrl: string = '';
  ngOnInit(): void {
    if (this.media || this.path) {
      this.imageUrl = `${environment.apiUrl}file/${this.media}?originalFilename=${this.path}`;
    }
  }
  @Input() path!: string;
  @Input() media!: string;

  isImage(): boolean {
    return (
      this.path.includes('jpg') ||
      this.path.includes('png') ||
      this.path.includes('jpeg') ||
      this.path.includes('gif') ||
      this.path.includes('svg')
    );
  }

  // <button class="btn btn-primary brand-button" (click)="getFile(media.multimedia,media.path)">Download</button>
  // <!-- http://localhost:3000/file/3cd75898c2763b497c01535f884ad5ff?originalFilename=buttahdoggo.jpg -->
  //                     <img src="{{getFile(media.multimedia,media.path)}}" alt="">
}
