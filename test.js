const axios = require('axios');
const fs = require('node:fs');

function exportData(data){
    const accounts = data.map(element => `${element.email}|${element.password}`);
    const fileWrite = accounts.join('\n');
    fs.writeFile('/Users/mins/Desktop/test.txt', fileWrite, err => {
        if (err) {
          console.error(err);
        } else {
            console.log("Done")
          // file written successfully
        }
      });
    
}

axios.get("https://ios.bmctech.one/data/accounts").then(function(accs) {
    const data = accs.data;
    const bmcTechAccounts = data.filter(element => element.email.endsWith("bmctech.one"));
    const tiktokAccounts =     data.filter(element => element.type === "Tiktok" )
    const tiktokHotmail = tiktokAccounts.filter(element => element.email.endsWith("hotmail.com"));
    const tiktokOutlook = tiktokAccounts.filter(element => element.email.endsWith("outlook.com"));
    exportData([...tiktokHotmail, ...tiktokOutlook])
    console.log(tiktokOutlook.length + tiktokHotmail.length);
    // exportData(tiktokAccounts);
})
   
