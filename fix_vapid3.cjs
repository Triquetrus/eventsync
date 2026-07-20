const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /let vapidKey = .*?;/s,
  `let vapidKey = "BBcxA9wZ6dWHbYO4mPod7DOwFHwyi-dWkW4cV1-89rt5lBL465xas5H4mcJyhGAXmZFazslKdqUHf3SAxxDJux8";`
);

code = code.replace(
  /let vapidPriv = .*?;/s,
  `let vapidPriv = "1ntNCqCyM0NA1wQ8-BaEoNM2wZCN1miw7uwascDdW-k";`
);

fs.writeFileSync('server.ts', code);
console.log("Updated vapid keys to be hardcoded in server.ts");
