import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtagDialogComponent } from './addtag-dialog.component';

describe('AddtagDialogComponent', () => {
  let component: AddtagDialogComponent;
  let fixture: ComponentFixture<AddtagDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddtagDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddtagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
