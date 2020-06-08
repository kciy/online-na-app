import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsPageComponent } from './documents-page.component';

describe('DocumentsPageComponent', () => {
  let component: DocumentsPageComponent;
  let fixture: ComponentFixture<DocumentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
