using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PushNotificationApp.Models;
using WebPush;

namespace PushNotificationApp.FakeStorage
{
    public class PushSubscriptions : IPushSusbscriptions
    {
        private IList<PushSubscription> _subscriptions = new List<PushSubscription>();

        public void Add(PushNotificationSubscription pushSubscription)
        {
            if (_subscriptions.Any(x => x.P256DH == pushSubscription.Key && x.Auth == pushSubscription.AuthSecret))
                return;


            var subscription = new PushSubscription(pushSubscription.Endpoint, pushSubscription.Key, pushSubscription.AuthSecret);
            _subscriptions.Add(subscription);
        }

        public void Clear()
        {
            _subscriptions = new List<PushSubscription>();
        }

        public IList<PushSubscription> GetAll()
        {
            return _subscriptions;
        }
    }
}
