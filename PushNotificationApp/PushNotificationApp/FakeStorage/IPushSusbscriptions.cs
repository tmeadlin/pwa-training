using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PushNotificationApp.Models;
using WebPush;

namespace PushNotificationApp.FakeStorage
{
    public interface IPushSusbscriptions
    {
        void Add(PushNotificationSubscription pushSubscription);
        void Clear();
        IList<PushSubscription> GetAll();
    }
}
