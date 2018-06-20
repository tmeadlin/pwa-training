using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MoreLinq;
using Newtonsoft.Json;
using PushNotificationApp.FakeStorage;
using PushNotificationApp.Models;
using WebPush;

namespace PushNotificationApp.Controllers
{
    [Produces("application/json")]
    [Route("api/NotificationSubscriptions")]
    public class NotificationSubscriptionsController : Controller
    {
        private readonly IPushSusbscriptions _pushSusbscriptions;
        private readonly VapidSettings _settings;

        public NotificationSubscriptionsController(IOptions<VapidSettings> settings, IPushSusbscriptions pushSusbscriptions)
        {
            _pushSusbscriptions = pushSusbscriptions;
            _settings = settings.Value;
        }

        [HttpGet("Subscriptions")]
        public IActionResult GetKeys()
        {
            return Ok(_pushSusbscriptions.GetAll());
        }

        [HttpGet("Clear")]
        public IActionResult ClearKeys()
        {
            _pushSusbscriptions.Clear();
            return Ok();
        }

        [HttpPost("Send")]
        public async Task<IActionResult> SendNotificationAsync([FromBody] SendNotification model)
        {
            var vapidDetails = new VapidDetails(_settings.Subject, _settings.PublicKey, _settings.PrivateKey);

            var webPushClient = new WebPushClient();
            webPushClient.SetVapidDetails(vapidDetails);

            // send notification 
            var payload = new PushNotificationPayload
            {
                Title = "Push Demo Title",
                Body = "Put some message in the body of the notification.",
                Icon = "assets/cazton-c.png",
                Vibrate = new List<int> { 100, 50, 100 }
            };

            try
            {
                var subscription = _pushSusbscriptions.GetAll().FirstOrDefault(x => x.Endpoint == model.Endpoint);

                if (subscription != null)
                {
                    await webPushClient.SendNotificationAsync(subscription, JsonConvert.SerializeObject(new { notification = payload }), vapidDetails);
                }
            }
            catch (WebPushException exception)
            {
                var statusCode = exception.StatusCode;
            }

            return Ok();
        }

        [HttpPost]
        public IActionResult CreateNotification([FromBody] PushNotificationSubscription pushSubscription)
        {
            _pushSusbscriptions.Add(pushSubscription);
            return NoContent();
        }
    }
}