import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRecentSearchComponent } from './content-recent-search.component';

describe('ContentRecentSearchComponent', () => {
  let component: ContentRecentSearchComponent;
  let fixture: ComponentFixture<ContentRecentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentRecentSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentRecentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
