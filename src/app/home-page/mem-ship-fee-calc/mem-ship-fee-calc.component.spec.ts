import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemShipFeeCalcComponent } from './mem-ship-fee-calc.component';

describe('MemShipFeeCalcComponent', () => {
  let component: MemShipFeeCalcComponent;
  let fixture: ComponentFixture<MemShipFeeCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemShipFeeCalcComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemShipFeeCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
