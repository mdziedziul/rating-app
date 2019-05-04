import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Loan } from './loan.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(private http: HttpClient) { }

  public getLoansByRating(rating: string, size: string) {
    return this.http.get<Loan[]>(environment.dataRating + '?rating__eq=' + rating, { headers: { 'x-size' : size } });
  }

  public getLoansCountByRating(rating: string): Observable<HttpResponse<Loan[]>> {
    return this.http.get<Loan[]>(environment.dataRating + '?rating__eq=' + rating, { observe: 'response' });
  }

}
