var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.kustomerapp.com",
  "port": null,
  "path": "/v1/customers",
  "headers": {
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzhlMzVmN2RlOGQ4MDAzNGI5MTQxYSIsInVzZXIiOiI1YmM4ZTM1ZmUxYTc4NDAwMTMyNWM2MGIiLCJvcmciOiI1YmJiZGIzMzMxZDdkNjAwMTE3YzAzNGYiLCJvcmdOYW1lIjoienp6LWx1aXotYSIsInVzZXJUeXBlIjoibWFjaGluZSIsInJvbGVzIjpbIm9yZy5hZG1pbiIsIm9yZy51c2VyIl0sImV4cCI6MTU0MDQ5Njg2MiwiYXVkIjoidXJuOmNvbnN1bWVyIiwiaXNzIjoidXJuOmFwaSIsInN1YiI6IjViYzhlMzVmZTFhNzg0MDAxMzI1YzYwYiJ9.ENwZofNrwAbLic8BvDXQmXhElbzMNbjAFTHpH2fSi9w",
    "content-type": "application/json"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  })

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({
  name: 'bob boberson',
  emails: [ { type: 'home', email: 'bob@example.com' } ],
  phones: [ { type: 'work', phone: '+18005251212' } ],
  socials:
   [ { type: 'twitter',
       userid: '12434',
       username: '@bob',
       url: 'http://twitter.com/bob' } ],
  urls: [ { url: 'https://kustomer.com' } ],
  locations: [ { type: 'work', address: '530 7th Ave, New York, NY 10018' } ],
  locale: 'en_US',
  gender: 'm',
  tags: [ 'cool customer', 'nice', 'bob' ] }));
req.end();
