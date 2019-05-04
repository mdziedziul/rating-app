import { Component, OnInit } from '@angular/core';
import { LoansService } from '../loans.service';
import { Loan } from '../loan.model';
import { Rating } from '../rating.enum';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  loans: Loan[];
  ratings: Rating[];
  average: any = 'Vyber ohodnocení';

  constructor(
    private loansService: LoansService
  ) { }

  ngOnInit() {
    this.ratings = Object.values(Rating);
  }

  getLoansCountByRating(rating) {
    this.loansService.getLoansCountByRating(rating).subscribe(
      resp => {
        const size = resp.headers.get('x-total');
        this.loansService.getLoansByRating(rating, size).subscribe(
          (loans: Loan[]) => {
            this.loans = loans;
            let sum = 0;
            for (const loan of loans) {
              const amount = loan.amount;
              sum += amount;
            }
            this.average = Math.round((sum / loans.length) * 100) / 100;
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  }

}
