import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { ListeventsComponent } from 'src/app/events/listevents/listevents.component';

describe('NavbarComponent', function () {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule.withRoutes([{ path: 'events', component: ListeventsComponent }])],
      declarations: [NavbarComponent, ListeventsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check items in menubar', async(
    inject([Router, Location], (router: Router, location: Location) => {
      fixture.debugElement.query(By.css('#events')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/events');
      });
    }),
  ));

  it('should be 2 items in navbar', () => {
    const elem = fixture.debugElement.queryAll(By.css('.navbar-nav')).length;
    expect(elem).toBe(2);
  });
});
