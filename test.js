const https = require('https');
const http = require('http');
const {ProxyAgent} = require('proxy-agent');
const axios = require('axios');

// async function checkProxy(ipAddress, port, username = null, password = null, type = "http") {
//   let authProxyString = "";
//   if (username && password) authProxyString = `${username}:${password}@`;
//   const proxyURL = `${type}://${authProxyString}${ipAddress}:${port}`;
//   console.log(`Using proxy: ${proxyURL}`);
//   const agent = new ProxyAgent(proxyURL);

//   return new Promise((resolve, reject) => {
//       https.get('https://icanhazip.com', { agent }, (res) => {
//           let data = '';
//           res.setEncoding('utf8');
//           res.on('data', (chunk) => {
//               data += chunk;
//           });
//           res.on('end', () => {
//               resolve(data.trim());
//           });
//       }).on('error', (err) => {
//           reject(err);
//       });
//   });
// }

async function checkProxy(ipAddress, port, username = null, password = null, type = "http") {
 const proxy = {
  protocol: "http",
  host: ipAddress,
  port: port,
  ...(username && password ? { username: username, password: password } : {})

 }
 axios.get("http://icanhazip.com", {proxy}).then(res => {
  console.log(res.data)
 })
}


checkProxy("ip.mproxy.vn", "12342","ocbaokhang1","r1DxLTJaItcA1Dk4").then(data => {
  console.log(data);
})