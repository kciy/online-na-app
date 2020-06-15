import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaExplorerComponent } from './agenda-explorer.component';

describe('AgendaExplorerComponent', () => {
  let component: AgendaExplorerComponent;
  let fixture: ComponentFixture<AgendaExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
