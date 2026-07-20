const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /let vapidKey = .*?;/s,
  `let vapidKey = (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PUBLIC_KEY.length > 20) ? process.env.VAPID_PUBLIC_KEY : "BBcxA9wZ6dWHbYO4mPod7DOwFHwyi-dWkW4cV1-89rt5lBL465xas5H4mcJyhGAXmZFazslKdqUHf3SAxxDJux8";\nvapidKey = vapidKey.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');`
);

code = code.replace(
  /let vapidPriv = .*?;/s,
  `let vapidPriv = (process.env.VAPID_PRIVATE_KEY && process.env.VAPID_PRIVATE_KEY.length > 40) ? process.env.VAPID_PRIVATE_KEY : "1ntNCqCyM0NA1wQ8-BaEoNM2wZCN1miw7uwascDdW-k";\nvapidPriv = vapidPriv.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');`
);

fs.writeFileSync('server.ts', code);
console.log("Updated vapid keys in server.ts");
