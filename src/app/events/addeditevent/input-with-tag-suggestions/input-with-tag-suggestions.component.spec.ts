import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithTagSuggestionsComponent } from './input-with-tag-suggestions.component';

describe('InputWithTagSuggestionsComponent', () => {
  let component: InputWithTagSuggestionsComponent;
  let fixture: ComponentFixture<InputWithTagSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWithTagSuggestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputWithTagSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
