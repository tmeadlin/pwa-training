import {Component, OnInit} from '@angular/core';
import {SwPush, SwUpdate} from '@angular/service-worker';
import {PushSubscriptionModel} from './shared/models/push-subscription.model';
import {PushSubscriptionService} from './push-subscription.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private currentEndpoint: string;
  private readonly VAPID_PUBLIC_KEY = 'BLnSZOhobknRFOFKEsORBCl9PVhEaOFfxI7HsyRMOW1dFF09PIsb3qb_QJng-zXyaPHLjpbbYrqs55r--had9q0';

  constructor(private pushSubscriptionService: PushSubscriptionService, private swUpdate: SwUpdate, private swPush: SwPush) { }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version is available. Load New Version?')) {
          window.location.reload();
        }
      });
    }

    if (this.swPush.isEnabled) {
      this.swPush.subscription.subscribe(sub => {
        // subscription already exists
        if (sub) {
          const subscriptionModel = this.getSubscriptionModel(sub);

          if (this.currentEndpoint && this.currentEndpoint === subscriptionModel.endpoint){
            return;
          }

          this.currentEndpoint = subscriptionModel.endpoint;
          this.pushSubscriptionService.saveSubscription(subscriptionModel).subscribe();
          return;
        }

        this.subscribeToNotifications();
      });
    }
  }

  sendNotification() {
    this.pushSubscriptionService.getNotification(this.currentEndpoint).subscribe();
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(subscription => {
        const subscriptionModel = this.getSubscriptionModel(subscription);
        this.currentEndpoint = subscriptionModel.endpoint;
        this.pushSubscriptionService.saveSubscription(subscriptionModel).subscribe();
      })
      .catch(err => console.error('Unable to subscribe', err));
  }

  getSubscriptionModel(subscription: PushSubscription): PushSubscriptionModel {
    const keys = subscription.toJSON()['keys'];
    return new PushSubscriptionModel(keys['p256dh'], subscription.endpoint, keys['auth']);
  }
}
