# AngularPwaDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

# Extra API Setup
* Right click the PushNotificationApp project and select "Manage User Secrets"
* Within the secrets.json that comes up, put in the following json code
```json
{
  "VAPID": {
    "Subject": "mailto:tyler@chanderdhall.com",
    "PublicKey": "BLnSZOhobknRFOFKEsORBCl9PVhEaOFfxI7HsyRMOW1dFF09PIsb3qb_QJng-zXyaPHLjpbbYrqs55r--had9q0",
    "PrivateKey": "0lD0eYUF1bJm_Az-iX7VVENjqvS6Lh_h0RvYSC6I94E"
  }
}
```

## To Run As PWA
To Run as a PWA application, one will need to run the application from the "/dist" folder. This application also is expecting to be run with the API "PushNotifiationApp".

* Go into the src/environments/environment.prod.ts folder and update the apiDomain variable. It is already set to "http://localhost:32205" which is the domain of the api when run through VS Debug, not dotnet run.
* Once the environment variable change has been made, update the /dist folder by running "ng build --prod"
* To run the application after, start the API PushNotificationApp project, and then run "http-server -o" from the /dist/angular-pwa-demo folder

*Note: The application can still be run normally using ng serve, but the PWA functionality will not be implemented

## What To Expect
* No console errors should be displayed
* Pressing the Send Notification, should display a notification popup on the bottom right of your browser
