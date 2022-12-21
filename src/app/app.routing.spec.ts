import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { routes } from './app.routing';
import { ListeventsComponent } from './events/listevents/listevents.component';
import { AppComponent } from './app.component';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ListeventsComponent],
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('navigate to "" redirects you to /events', fakeAsync(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/events');
    });
  }));

  it('navigate to "/events/archive" takes you to archive page', fakeAsync(() => {
    router.navigate(['/events/archive']).then(() => {
      expect(location.path()).toBe('/events/archive');
    });
  }));
});
