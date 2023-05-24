import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public isProgress: boolean = false;
  public commentDetails = new BehaviorSubject({});
  constructor() { }

  setCommentDetails(comment: object): void {
    this.commentDetails.next(comment);
  }

  getCommentDetails(): Observable<any> {
    return this.commentDetails.asObservable();
  }
}
