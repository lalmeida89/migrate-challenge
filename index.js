const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const http = require('https');


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

//Fetching data from Google Sheets API

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listCustomers);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */


 function listCustomers(auth) {
   const sheets = google.sheets({version: 'v4', auth});
   sheets.spreadsheets.values.get({
     spreadsheetId: '1FPYh5c8LY70TlJAS5X2oHASfNWbKPeQEBtTD13y6YEY',
     range: 'Data',
   }, (err, res) => {
     if (err) return console.log('The API returned an error: ' + err);
     const rows = res.data.values;
     if (rows.length) {
       let options = {
         "method": "POST",
         "hostname": "api.kustomerapp.com",
         "port": null,
         "path": "/v1/customers",
         "headers": {
           "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzhlMzVmN2RlOGQ4MDAzNGI5MTQxYSIsInVzZXIiOiI1YmM4ZTM1ZmUxYTc4NDAwMTMyNWM2MGIiLCJvcmciOiI1YmJiZGIzMzMxZDdkNjAwMTE3YzAzNGYiLCJvcmdOYW1lIjoienp6LWx1aXotYSIsInVzZXJUeXBlIjoibWFjaGluZSIsInJvbGVzIjpbIm9yZy5hZG1pbiIsIm9yZy51c2VyIl0sImV4cCI6MTU0MDQ5Njg2MiwiYXVkIjoidXJuOmNvbnN1bWVyIiwiaXNzIjoidXJuOmFwaSIsInN1YiI6IjViYzhlMzVmZTFhNzg0MDAxMzI1YzYwYiJ9.ENwZofNrwAbLic8BvDXQmXhElbzMNbjAFTHpH2fSi9w",
           "content-type": "application/json"
         }
       };
       const obj = {
         name: '',
         emails: [  ],
         phones: [  ]
       };
       rows.map((row, index) => {
         console.log(row)
         if(index >= 1){
           let req = http.request(options, function (res) {
             let chunks = [];

             res.on("data", function (chunk) {
               chunks.push(chunk);
             })

             res.on("end", function () {
               let body = Buffer.concat(chunks);
             })
           });
           row[0] ? obj.name = row[0] + row[1] : ''
           row[5] ? obj.phones.push({type: 'work', phone: row[5] }) : ''
           row[4] ? obj.phones.push({type: 'home', phone: row[4] }) : ''
           row[2] ? obj.emails.push({type: 'work', email: row[2] }) : ''
           req.write(JSON.stringify(obj))
           req.end();
         }
       })
     } else {
       console.log('No data found.');
     }
   })
 }
