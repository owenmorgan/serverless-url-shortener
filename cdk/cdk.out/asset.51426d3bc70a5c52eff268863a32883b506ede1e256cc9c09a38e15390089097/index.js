exports.handler = (event, ctx, cb) => {
  console.log(JSON.stringify(event));
  const request = event.Records[0].cf.request;
  if (request.method === "GET") {
    const https = require("https");
    const options = {
      hostname: "jeli.fish",
      port: 443,
      path: "/api/click",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = JSON.stringify({
      id: request.uri,
    });
    const req = https.request(options, (res) => {
      res.on("data", (chunk) => {});
      res.on("end", () => {
        console.log(`sent`);
      });
    });

    // Define the error handling for the HTTPS request
    req.on("error", (error) => {
      console.error(error);
      cb(error);
    });

    // Send the HTTPS request with the data
    req.write(data);
    req.end();
  }

  cb(null, request);
  return;
};
