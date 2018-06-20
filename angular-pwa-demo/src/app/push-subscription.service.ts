import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {PushSubscriptionModel} from './shared/models/push-subscription.model';

@Injectable({
  providedIn: 'root'
})
export class PushSubscriptionService {

  constructor(private apiService: ApiService) { }

  getNotification(currrentEndpoint: string): Observable<void> {
    return this.apiService.post('/api/NotificationSubscriptions/Send', { endpoint: currrentEndpoint });
  }

  saveSubscription(subscription: PushSubscriptionModel): Observable<void> {
    return this.apiService.post('/api/NotificationSubscriptions', subscription);
  }

  getKeys(): Observable<any> {
    return this.apiService.get('/api/NotificationSubscriptions/Keys');
  }
}
