﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PushNotificationApp.Models
{
    public class PushNotificationSubscription
    {
        public string Key { get; set; }
        public string Endpoint { get; set; }
        public string AuthSecret { get; set; }
    }
}
