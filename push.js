var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BICVxdAzA7eAucBUA91eYYVjXfaLoGUZJD0DiduGhAYbAQ3C_6h0yf3RtfrvNy60jH8bHkeIYwnrLneSFvc0-i8",
    "privateKey": "DyOtzKc1UcTRuPCLx6KxTG06T8SzgEqqJTC6kkYbxEI"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "ttps://fcm.googleapis.com/fcm/send/daCoolIGxzc:APA91bFalL1_5Bve-dNFkEyLfIPcRsqIXE8MjOB_J55eOULBg9JCMLF5FPUR-LMBLJUUoo4W0OoSuy6B3v6ePbFF6UZiGA8S3KK26ff65ecmwFLdWXjATScuz6_TJFsredm7iGDfZDU9",
    "keys": {
        "p256dh": "BBkkSVmF8caLjN5B+YFc5Aw7m/D7snmz98Lo5YQRYR1Doypm9HiNVXqpYGPdL4t68yJw6zgteqvdU/Yhnyvt3sw=",
        "auth": "4zHojAMHsrDSk9a5SMzJ6w=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '557619027591',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);