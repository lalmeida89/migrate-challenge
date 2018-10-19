var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.kustomerapp.com",
  "path": "/v1/customers",
  "headers": {
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzhlMzVmN2RlOGQ4MDAzNGI5MTQxYSIsInVzZXIiOiI1YmM4ZTM1ZmUxYTc4NDAwMTMyNWM2MGIiLCJvcmciOiI1YmJiZGIzMzMxZDdkNjAwMTE3YzAzNGYiLCJvcmdOYW1lIjoienp6LWx1aXotYSIsInVzZXJUeXBlIjoibWFjaGluZSIsInJvbGVzIjpbIm9yZy5hZG1pbiIsIm9yZy51c2VyIl0sImV4cCI6MTU0MDQ5Njg2MiwiYXVkIjoidXJuOmNvbnN1bWVyIiwiaXNzIjoidXJuOmFwaSIsInN1YiI6IjViYzhlMzVmZTFhNzg0MDAxMzI1YzYwYiJ9.ENwZofNrwAbLic8BvDXQmXhElbzMNbjAFTHpH2fSi9w"
  }
};

var req1 = http.request(options, function (res1) {
  var chunks1 = [];

  res1.on("data", function (chunk1) {
    chunks1.push(chunk1);
  });

  res1.on("end", function () {
    var body1 = Buffer.concat(chunks1).toString()
    let newBody = JSON.parse(body1)
    for(let i=0; i<newBody.data.length; i++){
      var options = {
        "method": "DELETE",
        "hostname": "api.kustomerapp.com",
        "port": null,
        "path": `/v1/customers/${newBody.data[i].id}`,
        "headers": {
          "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzkwYWExNDI2NTlmMDAzNDVlYmYyOCIsInVzZXIiOiI1YmM5MGFhMTk2NjE4MzAwMTE4MTJlMjIiLCJvcmciOiI1YmJiZGIzMzMxZDdkNjAwMTE3YzAzNGYiLCJvcmdOYW1lIjoienp6LWx1aXotYSIsInVzZXJUeXBlIjoibWFjaGluZSIsInJvbGVzIjpbIm9yZy5hZG1pbi5jdXN0b21lci5kZWxldGUiXSwiZXhwIjoxNTQwNTA2OTEyLCJhdWQiOiJ1cm46Y29uc3VtZXIiLCJpc3MiOiJ1cm46YXBpIiwic3ViIjoiNWJjOTBhYTE5NjYxODMwMDExODEyZTIyIn0.u8xTkQ09ZkQX2ao9Sgcethcl5C47C8A-DbV5ecyBzvw"
        }
      };

      var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          var body = Buffer.concat(chunks);
        });
      });
      req.write("{}");
      req.end();
    }
  });
});

req1.write("{}");
req1.end();
