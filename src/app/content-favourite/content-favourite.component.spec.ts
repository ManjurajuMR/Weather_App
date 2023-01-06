import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFavouriteComponent } from './content-favourite.component';

describe('ContentFavouriteComponent', () => {
  let component: ContentFavouriteComponent;
  let fixture: ComponentFixture<ContentFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentFavouriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
