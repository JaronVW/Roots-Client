import { Location } from '@angular/common';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from './app.routing';
import { ListeventsComponent } from './events/listevents/listevents.component';

describe('Router: App', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ListeventsComponent],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  it('navigate to "" redirects you to /events', fakeAsync(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/events');
    });
  }));

  it('navigate to "/login" takes you to login page', fakeAsync(() => {
    router.navigate(['/login']).then(() => {
      expect(location.path()).toBe('/login');
    });
  }));

  it('navigate to "/register" takes you to register page', fakeAsync(() => {
    router.navigate(['/register']).then(() => {
      expect(location.path()).toBe('/register');
    });
  }));
});
