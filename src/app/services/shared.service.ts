import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private subject = new Subject<any>();

  sendClickEvent(infoCart: any) {
    this.subject.next(infoCart);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
