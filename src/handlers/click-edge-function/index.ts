const domain = process.env.DOMAIN;

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var method = request.method;
  var body = JSON.stringify({ uri: uri, method: method });

  var response = {
    status: "200",
    statusDescription: "OK",
    headers: {
      "content-type": [
        {
          key: "Content-Type",
          value: "application/json",
        },
      ],
    },
    body: body,
  };

  if (method.toLowerCase() == "get") {
    var apiRequest = new Request("https://${domain}/api/click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    fetch(apiRequest)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return response;
}
