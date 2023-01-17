import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtModule } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';

import { OrganisationComponent } from './organisation.component';

describe('OrganisationComponent', () => {
  let component: OrganisationComponent;
  let fixture: ComponentFixture<OrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganisationComponent],
      imports: [HttpClientModule, JwtModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganisationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
