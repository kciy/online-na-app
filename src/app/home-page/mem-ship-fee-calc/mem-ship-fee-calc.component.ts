import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mem-ship-fee-calc',
  templateUrl: './mem-ship-fee-calc.component.html',
  styleUrls: ['./mem-ship-fee-calc.component.scss'],
})
export class MemShipFeeCalcComponent implements OnInit {
  ngOnInit() {}

  sumFee = 0;
  frac = 1;
  fees = [0];

  public heis: any[] = [
    {
      id: 1,
      outgoings: null,
    },
  ];

  addHei() {
    this.heis.push({
      id: this.heis.length + 1,
      outgoings: null,
    });
    this.getFee();
  }

  removeHei(i: number) {
    this.heis.splice(i, 1);
    this.getFee();
  }

  getFee(year = 2021) {
    this.sumFee = 0;
    for (let i = 0; i < this.heis.length; i++) {
      if (this.heis[i].outgoings < 5) {
        this.fees[i] = 0;
      } else if (this.heis[i].outgoings >= 5 && this.heis[i].outgoings < 25) {
        this.fees[i] = 50;
      } else if (this.heis[i].outgoings >= 25 && this.heis[i].outgoings < 50) {
        this.fees[i] = 100;
      } else if (this.heis[i].outgoings >= 50 && this.heis[i].outgoings < 350) {
        this.fees[i] = 150;
      } else {
        this.fees[i] = 275;
      }
      this.sumFee = this.fees.reduce((a, b) => a + b, 0);
    }
    switch (year) {
      case 2021:
        this.frac = 0.33;
        break;
      case 2022:
        this.frac = 0.66;
        break;
      default:
        this.frac = 1;
        break;
    }
    this.sumFee *= this.frac;
    if (year == 2021 && this.sumFee > 75) {
      this.sumFee = 75;
    }
    if (year == 2022 && this.sumFee > 225) {
      this.sumFee = 225;
    }
    return this.sumFee;
  }

  getUpdatedFee() {
    return this.sumFee;
  }
}
